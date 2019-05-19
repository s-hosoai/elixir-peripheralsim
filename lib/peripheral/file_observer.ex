defmodule Peripheral.FileObserver do
  use GenServer
  require Logger

  def start_link(file) do
    Logger.info("Observer start_link")
    GenServer.start_link(__MODULE__, {file})
  end

  def init({file}) do
    Logger.info("Observer init")
    stream = File.stream!(file)
    GenServer.cast(self, :check)
    {:ok, {stream, nil}}
  end

  def handle_cast(:check, {stream, last_modified}) do
    last_modified = check_file(stream, last_modified)
    :timer.sleep(1000)
    GenServer.cast(self, :check)
    {:noreply, {stream, last_modified}}
  end

  def check_file(stream, last_modified) do
    cond do
      !File.exists?(stream.path) ->
        Logger.error("Observer not exists")
        last_modified

      File.stat!(stream.path).mtime == last_modified ->
        last_modified

      true ->
        lines = stream |> Enum.into([])
        PeripheralWeb.Endpoint.broadcast!("file:update", "lines", %{lines: lines})
        Logger.info("Observer file changed")
        File.stat!(stream.path).mtime
    end
  end
end
