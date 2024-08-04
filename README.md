# Task Timer

**Task Timer** is a simple and intuitive task management application designed to help you stay focused and organized. This app features a customizable countdown timer to keep track of time for different tasks or activities.

## Features

- **Customizable Timer:** Set the timer for any duration using URL parameters or the default value. The app stores your settings in `localStorage` so your preferences persist across sessions.
- **Task Messaging:** Display a custom message for each task, which can be set via URL parameters or saved locally.
- **Pause and Reset:** Pause or resume the timer and reset it as needed.
- **Loading Spinner:** A loading spinner ensures a smooth user experience, displayed for at least 1 second before the timer is shown.
- **Audio Alert:** When the timer ends, an audio alert plays to notify you, ensuring you never miss the end of a task.


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nachat-ayoub/task-timer
   ```
2. Navigate to the project directory:
   ```bash
   cd task-timer
   ```
3. Install dependencies using Bun:
   ```bash
   bun install
   ```
4. Start the development server:
   ```bash
   bun dev
   ```

   Alternatively, you can use npm or yarn:

   Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

   Start the development server:
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

## Usage

- **Set Timer:** Add `?minutes=30` to the URL to set the timer to 30 minutes. Adjust the value as needed.
- **Task Message:** Add `?task=Your Task Message` to the URL to set a custom task message. Replace `Your Task Message` with your desired message.
- **Start Timer:** The timer starts automatically.
- **Pause/Resume Timer:** Use the "Pause" button to pause the timer, and the "Resume" button to continue it.
- **Reset Timer:** Click the "Reset Timer" button to restart the countdown from the initial value.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please open an issue or submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by various task management and timer apps.
- Special thanks to the open-source community for their contributions.

---

*Created by Ayoub Nachat*
