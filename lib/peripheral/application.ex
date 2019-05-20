defmodule Peripheral.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    # List all child processes to be supervised
    children = [
      # Start the endpoint when the application starts
      PeripheralWeb.Endpoint,
      # Starts a worker by calling: Peripheral.Worker.start_link(arg)
      {Peripheral.FileObserver, ["../../athrill/athrill/sample/os/asp3/OBJ/mmap.bin"]}
      # {Peripheral.FileObserver, ["data/sample.txt"]}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Peripheral.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    PeripheralWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
