# Peripheral
Athrillのメモリマップファイルを監視し、MCUの外側をシミュレーションするサンプルです。
Elixir + Phoenix + React + Typescriptな環境で構築しています。

/lib/peripheral/application.exの10行目あたりをお手元のAthrill環境のパスに変更してください。
周辺機器は/assets/js/pages/peripheral.tsxを編集してください。現在周辺機器としてLEDとPushボタンがあります。
アドレスは16bit幅で、メモリマップファイルの先頭を0x00としています。エンディアンやらめちゃくちゃなので、実環境と揃えていきたいです。
LEDは該当アドレスの指定ビットが1のときに赤に光ります。 PushButtonは押すと該当アドレスのビットを1にします。

# How to use

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
