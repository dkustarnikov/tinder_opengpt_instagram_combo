# Tinder OpenGPT Instagram Combo

This project combines functionalities from Tinder, OpenAI's GPT, and Instagram. It allows you to automate interactions on these platforms using a set of predefined scripts.

## Features

- **Tinder Automation**: Automatically swipes and interacts with matches.
- **OpenGPT Integration**: Uses OpenAI's GPT for generating messages.
- **Instagram Automation**: Automates posts and interactions on Instagram.

## Prerequisites

- Node.js installed on your machine.
- Tinder, OpenAI, and Instagram accounts with necessary credentials.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/dkustarnikov/tinder_opengpt_instagram_combo.git
    cd tinder_opengpt_instagram_combo
    ```

2. Install the required dependencies:
    ```sh
    npm install
    ```

3. Create a `constants.js` file in the root directory with the following variables (refer to `index.js` for an example):
    ```js
    module.exports = {
        TINDER_API_KEY: 'your_tinder_api_key',
        OPENAI_API_KEY: 'your_openai_api_key',
        INSTAGRAM_USERNAME: 'your_instagram_username',
        INSTAGRAM_PASSWORD: 'your_instagram_password'
    };
    ```

## Usage

1. Run the application:
    ```sh
    node main.js
    ```

2. Follow the prompts to interact with Tinder and Instagram using OpenGPT.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions, feel free to open an issue or contact the repository owner.

---

**Note**: This project is intended for educational and research purposes. Use responsibly and respect the terms of service of the platforms involved.
