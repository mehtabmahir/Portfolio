export const projects = [
  {
    slug: 'easy-whisper-ui',
    title: 'EasyWhisperUI',
    category: 'DESKTOP APPLICATION · LOCAL AI',
    image: 'whisper-main.png',
    tags: ['Electron', 'React', 'TypeScript', 'whisper.cpp', 'llama.cpp', 'FFmpeg', 'Vulkan / Metal'],
    url: 'https://github.com/mehtabmahir/easy-whisper-ui',
    summary: 'Local transcription, live transcripts, and on-device AI summaries in one desktop app.',
    description:
      'An Electron, React, and TypeScript application built on whisper.cpp and llama.cpp. It queues audio and video, streams the transcript while Whisper works, then cleans up or summarizes the result without sending recordings to a server.',
    role: 'Solo developer · architecture, implementation, releases',
    problem:
      'Transcribing locally usually means assembling a toolchain before writing a single transcript: Whisper models, FFmpeg conversions, a GPU-enabled build, and a separate way to clean up the output. EasyWhisperUI puts that workflow behind one installer and one interface.',
    solution:
      'The app manages models, conversions, and transcription through whisper.cpp, shows transcript text as it is produced, and runs Qwen language models locally through llama.cpp for cleanup and summaries. Windows and Apple Silicon get GPU acceleration, with a CPU fallback.',
    decisions: [
      [
        'A Narrow Bridge to Privileged Work',
        'The React renderer has no Node.js access. A preload bridge exposes a small typed API, and the Electron main process owns file access, binaries, and transcription.'
      ],
      [
        'Streaming Instead of Waiting',
        'Whisper output is pushed to the interface as console, queue, and live-text events, which makes a long recording readable while it is still processing.'
      ],
      [
        'Setup as Part of the Product',
        'Windows setup installs the toolchain, builds whisper.cpp with GPU support, reports progress, and validates the result. macOS binaries ship with the app.'
      ]
    ],
    outcome:
      '588 GitHub stars and 37 forks as of November 6, 2026, with public releases maintained through 2025 and 2026. The latest release is v3.2.1. Windows and macOS are stable download targets; Linux remains in beta.',
    outcomeTitle: 'Adoption and Support'
  },
  {
    slug: 'auto-60hz',
    title: 'Auto 60 Hz',
    category: 'WINDOWS UTILITY',
    image: 'refresh.png',
    tags: ['C++', 'Qt', 'WinAPI', 'PSAPI'],
    url: 'https://github.com/mehtabmahir/auto-60hz-cpp',
    summary: 'Save laptop battery by lowering the refresh rate during full-screen video.',
    description:
      'Lowers the display refresh rate while a full-screen window is active on battery, then restores the higher rate afterward. Both rates and startup behavior are configurable, and common system processes are excluded.',
    role: 'Windows application development',
    problem:
      'A 120 Hz laptop panel keeps running at 120 Hz for 30 or 60 fps video, which spends power on frames the content does not contain. I wanted the higher refresh rate for everyday use without paying for it during full-screen playback.',
    solution:
      'Auto 60 Hz watches the foreground window and the power source. On battery, a full-screen window triggers the configured lower refresh rate; leaving full-screen mode or plugging in restores the higher rate. A Qt interface exposes both rates, run-at-startup, and a tray presence.',
    decisions: [
      [
        'Battery-Aware Switching',
        'The control loop reads Windows power status before changing anything. Plugged-in sessions keep the high refresh rate, so the tool only acts where the battery benefit exists.'
      ],
      [
        'Full-Screen State as the Trigger',
        'WinAPI window bounds identify full-screen use, and PSAPI resolves the process behind the window so shell and system processes can be excluded. The app does not inspect video playback or frame rate.'
      ],
      [
        'Configurable, Low-Overhead Behavior',
        'Users set the high and low rates and choose whether the app starts with Windows. The background loop checks once per second and skips the request when the target rate is already active.'
      ]
    ],
    outcome:
      'The README reports up to 20% longer battery life, which depends on the display, brightness, workload, and device. Full-screen games can also trigger the lower rate because the app does not detect media content.',
    outcomeTitle: 'Battery Benefit and Tradeoffs'
  },
  {
    slug: 'telemedicine',
    title: 'Telemedicine App',
    category: 'YHack 2024 · TEAM PROJECT',
    image: 'telemedicine.png',
    tags: ['Next.js', 'Firebase', 'OpenAI'],
    url: 'https://github.com/Prainex/medicine-chatbot/tree/main2',
    summary: 'Carry an AI-assisted intake conversation into a doctor chat.',
    description:
      'A four-person YHack prototype that collects symptoms through chat, summarizes the conversation, and lets a doctor review the context before responding.',
    role: 'Member of a four-person hackathon team',
    problem:
      'A patient describing symptoms in an initial chat may need to repeat that information when a clinician joins. My teammates and I wanted to carry that context into the doctor chat so patients would not have to start over.',
    solution:
      'The prototype pairs an OpenAI-assisted intake chat with a request to speak to a doctor. The request generates a short summary and issue title, and a doctor dashboard shows that context alongside real-time messaging through Firebase.',
    decisions: [
      [
        'Preserve Context at Handoff',
        'The patient flow asks for a summary and short issue title before creating a doctor request, so the clinician starts with the conversation rather than an empty chat.'
      ],
      [
        'Separate AI and Doctor Responses',
        'The chat route checks whether a doctor is active and stops generating AI responses for that interaction. Separate patient and doctor views support the change in who is responding.'
      ],
      [
        'Real-Time State in a Hackathon Prototype',
        'Firestore listeners update chat state in both views. Next.js and Material UI let the team focus on the intake-to-handoff flow within the time limit.'
      ]
    ],
    outcome:
      'We built a working intake, summarization, and doctor-messaging flow within the 24-hour hackathon. It demonstrates how a patient’s context can carry into a doctor chat; it remains a prototype and has not been clinically tested.',
    outcomeTitle: 'Prototype Outcome'
  },
  {
    slug: 'database-normalization',
    title: 'Database Normalization',
    category: 'DATA ENGINEERING',
    tags: ['T-SQL', 'SQL Server', 'Data modeling'],
    url: 'https://github.com/mehtabmahir/CSCI331Group3',
    summary: 'Migrate a denormalized sales database into a validated 3NF schema.',
    description:
      'Led a six-person team through third normal form design, schema migration, stored procedures, and validation for a SQL Server sales database.',
    role: 'Team lead, six-person project',
    problem:
      'The source sales database repeated customer, vehicle, and country details across records, which makes updates inconsistent and relationships hard to enforce. Moving it to a normalized schema also means moving the data itself without losing or orphaning a single row.',
    solution:
      'The team rebuilt the PrestigeCars database as PrestigeCars_3NF: schemas for reference, source, and output data, user-defined types, lookup tables with numeric keys, and stored procedures for repeatable loading. Cleaning steps trim text, replace nulls, and resolve country and make references before validation.',
    decisions: [
      [
        'Define the Model Before Loading',
        'Entity relationship diagrams and user-defined types established entities, keys, and allowed values before any data moved, giving the team one target schema for every script.'
      ],
      [
        'Make the Migration Repeatable',
        'Load scripts stage raw data, clean it, and insert it through sequence-backed keys and lookup joins, so the migration can be dropped and rerun instead of applied by hand.'
      ],
      [
        'Validate the Result, Not the Intent',
        'Row-count comparisons and foreign-key checks confirm that every source record arrived and that no child row points at a missing parent. Views and inline table-valued functions replace redundant reference tables.'
      ]
    ],
    outcome:
      'Delivered a normalized SQL Server schema with migration scripts, stored procedures, views, and documented validation queries. Every table’s source and target row counts matched, and the foreign-key checks returned no broken references.',
    outcomeTitle: 'Project Deliverables'
  },
  {
    slug: 'gemini-chatbot',
    title: 'Gemini Chatbot',
    category: 'AI APPLICATION',
    tags: ['React', 'Gemini API', 'Google Cloud'],
    url: 'https://github.com/mehtabmahir/geminichatbot',
    summary: 'Ask questions with text, images, or recorded speech.',
    description:
      'A React chatbot that accepts image uploads and microphone recordings, using Gemini and Google Cloud Speech-to-Text to process the inputs.',
    role: 'AI application development',
    problem:
      'A text-only chat requires users to type a question and describe any visual information themselves. The chatbot lets users add an image or record speech within the same conversation.',
    solution:
      'The React interface supports typed messages, image uploads, and audio recording. Recorded audio is transcribed through Google Cloud Speech-to-Text and then sent through the existing text conversation flow. Images use a separate upload-and-response path.',
    decisions: [
      [
        'Speech Feeds the Existing Chat Flow',
        'The audio handler converts a recording into a transcript and passes that text to the same send-message function used for typed input, so spoken questions reuse the text-chat path.'
      ],
      [
        'A Separate Image Upload Path',
        'An image upload is sent to the backend, and the returned image and result are inserted into the conversation, supporting visual questions beside ordinary text messages.'
      ],
      [
        'One Conversation Interface',
        'React manages message history and input controls while asynchronous request handlers update the conversation, keeping different input types within one interaction pattern.'
      ]
    ],
    outcome:
      'I built text, image, and recorded-speech input into one React interface and added speech-synthesis code. The app connects Gemini with Google Cloud Speech-to-Text so users can ask questions in the format that suits them.',
    outcomeTitle: 'Implemented Scope'
  },
  {
    slug: 'learning-snake',
    title: 'Snake Reinforcement Learning',
    category: 'MACHINE LEARNING',
    tags: ['Python', 'PyTorch', 'Reinforcement learning'],
    url: 'https://github.com/mehtabmahir/machinelearning-py',
    summary: 'Learn a Snake-playing policy from rewards instead of scripted moves.',
    description:
      'A PyTorch Q-learning experiment that trains on recent moves and replayed experience, with score plots and saved best-performing model weights.',
    role: 'Machine learning project',
    problem:
      'I wanted to train an agent to choose moves from game state and rewards without scripting a route to the food. It needed to represent nearby danger, direction, and food position, explore unfamiliar moves, and learn from unsuccessful games.',
    solution:
      'The agent encodes the game as 11 state values and uses a neural network to estimate the value of three relative actions: straight, right, or left. Training happens after individual moves and from sampled replay memory after each game.',
    decisions: [
      [
        'A Compact State Representation',
        'The state includes danger ahead and to either side, the current direction, and the food’s relative location. An 11–256–3 network maps those inputs to action values without processing raw pixels.'
      ],
      [
        'Learn from New and Previous Moves',
        'A replay buffer stores up to 100,000 transitions. Training combines recent transitions with batches of up to 1,000 stored experiences instead of relying only on the last move.'
      ],
      [
        'Track Learning Across Games',
        'Random exploration decreases as the game count increases. Per-game and running-average scores are plotted, and model weights are saved when a new high score is reached.'
      ]
    ],
    outcome:
      'The training loop includes score tracking and saved model checkpoints. The per-game and average-score plots make changes in performance visible across a training run.',
    outcomeTitle: 'Experiment Output'
  },
  {
    slug: 'workout-counter',
    title: 'Workout Counter iOS',
    category: 'iOS · ON-DEVICE VISION',
    tags: ['SwiftUI', 'AVFoundation', 'Apple Vision'],
    url: 'https://github.com/mehtabmahir/Workout-Counter',
    summary: 'Count bicep-curl repetitions without taking attention away from the exercise.',
    description:
      'An iOS app that counts bicep curls from on-device camera input, with repetition goals, a live pose overlay, and audio and haptic feedback.',
    role: 'iOS application development',
    problem:
      'Keeping track of repetitions can distract from the exercise, and checking a counter adds another interruption. Automating the count with a camera introduces a second problem: joint detections fluctuate, wrists leave the frame, and a partial movement should not count as a completed repetition.',
    solution:
      'AVFoundation captures camera frames and Apple Vision estimates body joints on the device. A curl counter smooths the elbow angle, requires a stable extension before a flexion, and chooses the moving arm automatically. A live skeletal overlay shows what is being tracked, and goals, audio, and haptics report progress.',
    decisions: [
      [
        'Smooth Before Counting',
        'Elbow angles pass through an exponential smoothing step before the state machine sees them. A curl must hold an extended angle above 130° for three frames, then reach 100° for three frames, with a minimum interval between repetitions.'
      ],
      [
        'Handle the Wrist Leaving the Frame',
        'A short motion history covers brief detection gaps. If the wrist disappears near the frame edge after a clear angle change, the repetition can still complete from recent samples instead of being lost.'
      ],
      [
        'Stay On Device',
        'Vision runs on the phone, so workout video never leaves the device and no account is required. An ExerciseCounter interface separates movement logic from camera capture, capturing UI state as SwiftUI views.'
      ]
    ],
    outcome:
      'Bicep-curl counting is implemented, and the counter protocol leaves room for additional exercises. Accurate counting depends on camera placement and visible joints; the app tracks repetitions and does not assess exercise form.',
    outcomeTitle: 'Current Scope'
  }
];
