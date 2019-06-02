defmodule Peripheral.FileChannel do
  use Phoenix.Channel
  require Logger

  def join("file:update", _auth_msg, socket) do
    {:ok, socket}
  end

  def join("file:" <> _private_room_id, _auth_msg, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  def handle_in("updateBit", %{"address" => address, "bit" => bit, "value" => value}, socket) do
    Peripheral.FileObserver.update(address, bit, value)
    {:noreply, socket}
  end
end
