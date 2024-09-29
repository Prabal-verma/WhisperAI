

### Whisper - AI-Powered Mental Health Support for Students

**Whisper** is an AI-driven chatbot designed to provide empathetic, confidential, and accessible mental health support for students. It leverages natural language processing (NLP) and machine learning to engage in meaningful conversations, helping students manage stress, anxiety, and emotional challenges.

### Project Overview

Mental health among students is a growing concern, with many facing academic pressure, social isolation, and personal struggles. Whisper offers round-the-clock emotional support, tailored guidance, and personalized mental health resources through secure, confidential conversations. The platform is designed to reduce stigma around mental health and complement traditional counseling services by offering immediate assistance for everyday concerns.

### Key Features

- **AI-Driven Conversations**: Engages in supportive dialogue using advanced AI and NLP algorithms.
- **Confidential and Secure**: Offers a safe, private space for users to express their emotions.
- **Personalized Resources**: Provides tailored mental health suggestions like mindfulness exercises and relevant articles.
- **Two-Factor Authentication (2FA)**: Ensures account security.
- **OAuth Login**: Supports secure login via Google or other providers.
- **Admin Dashboard**: Allows admin control over user management and mental health resources.

### Impact

1. **Improving Mental Health Support**: Provides easily accessible, non-judgmental support for students.
2. **Reducing Stigma**: Promotes open conversations about mental health in a safe, anonymous environment.
3. **Resource Availability**: Offers personalized mental health content and exercises.
4. **Supporting Institutions**: Eases the load on traditional counseling services by addressing less severe cases.

### Steps to Run Locally

#### 1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd whisper
   ```

#### 2. **Install Dependencies**:
   ```bash
   npm install
   ```

#### 3. **Configure Environment Variables**:
   Create a `.env` file with:
   ```bash
   DATABASE_URL=<your-mongodb-url>
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=<your-next-auth-secret>
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   ```

#### 4. **Prisma Setup**:
   ```bash
   npx prisma generate
   ```

#### 5. **Run the Development Server**:
   ```bash
   npm run dev
   ```

#### 6. **Access the Application**:
   Visit:
   ```bash
   http://localhost:3000
   ```

#### 7. **Admin Panel**:
   Navigate to:
   ```bash
   http://localhost:3000/admin
   ```
