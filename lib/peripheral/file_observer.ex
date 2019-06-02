defmodule Peripheral.FileObserver do
  use GenServer
  use Bitwise
  require Logger

  def start_link(file) do
    Logger.info("Observer start_link")
    GenServer.start_link(__MODULE__, {file}, name: __MODULE__)
  end

  def init({file}) do
    Logger.info("Observer init")
    GenServer.cast(self(), :check)
    {:ok, {file, nil}}
  end

  def handle_cast(:check, {file, file_data}) do
    file_data = check_file(file, file_data)
    :timer.sleep(100)
    GenServer.cast(self(), :check)
    {:noreply, {file, file_data}}
  end

  def handle_call({:update, address, bit, value}, _from, {file, file_data}) do
    bytes = :binary.bin_to_list(file_data)

    # to 16bit width
    byteAddress =
      cond do
        bit < 8 -> address * 2
        true -> address * 2 + 1
      end

    targetByte = Enum.at(bytes, byteAddress)

    updatedByte =
      case value do
        1 -> bor(targetByte, 1 <<< bit)
        0 -> band(targetByte, bnot(1 <<< bit))
        _ -> file_data
      end

    newFileData =
      List.replace_at(bytes, byteAddress, updatedByte)
      |> :binary.list_to_bin()

    {:ok, f} = File.open(file, [:write])
    :ok = IO.binwrite(f, newFileData)
    File.close(f)
    {:reply, {file, file_data}, {file, file_data}}
  end

  def update(address, value) do
    GenServer.call(__MODULE__, {:update, address, value})
  end

  def update(address, bit, value) do
    GenServer.call(__MODULE__, {:update, address, bit, value})
  end

  def check_file(file, prev_data) do
    new_data = File.read!(file)

    if new_data != prev_data do
      PeripheralWeb.Endpoint.broadcast!("file:update", "data", %{data: Base.encode16(new_data)})
      Logger.info("Observer file changed")
      new_data
    else
      prev_data
    end
  end
end
