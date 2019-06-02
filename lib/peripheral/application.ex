defmodule Peripheral.Application do
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      PeripheralWeb.Endpoint,
      # please set your athrill memory map file
      {Peripheral.FileObserver, ["data/mmap.bin"]}
      # {Peripheral.FileObserver, ["../../athrill/athrill/sample/os/asp3/OBJ/mmap.bin"]}
    ]

    opts = [strategy: :one_for_one, name: Peripheral.Supervisor]
    Supervisor.start_link(children, opts)
  end

  def config_change(changed, _new, removed) do
    PeripheralWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
