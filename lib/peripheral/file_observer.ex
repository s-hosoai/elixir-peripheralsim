defmodule Peripheral.FileObserver do
  use GenServer
  require Logger

  def start_link(file) do
    Logger.info("Observer start_link")
    GenServer.start_link(__MODULE__, {file})
  end

  def init({file}) do
    Logger.info("Observer init")
    GenServer.cast(self, :check)
    {:ok, {file, nil}}
  end

  def handle_cast(:check, {file, file_data}) do
    file_data = check_file(file, file_data)
    :timer.sleep(100)
    GenServer.cast(self, :check)
    {:noreply, {file, file_data}}
  end

  def check_file(file, prev_data) do
    new_data = File.read!(file)

    if new_data != prev_data do
      PeripheralWeb.Endpoint.broadcast!("file:update", "data", %{data: new_data})
      Logger.info("Observer file changed")
      new_data
    else
      prev_data
    end
  end
end
