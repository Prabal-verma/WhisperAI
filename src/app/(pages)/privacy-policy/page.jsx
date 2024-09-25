// pages/privacy-policy.js
import Head from 'next/head';

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy - Mental Health AI Assistant</title>
        <meta name="description" content="Privacy Policy for our Mental Health AI Assistant" />
      </Head>

      <div className="bg-gray-50 text-black min-h-screen py-10 px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>
        <p className="text-sm text-gray-600 mb-4">Effective Date: [Insert Date]</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-gray-700">
            Welcome to [Your Company Name]'s Mental Health AI Assistant. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            We collect the following types of information:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Personal Data:</strong> Name, email address, or other contact details when provided by you.</li>
            <li><strong>Usage Data:</strong> Information such as IP address, browser type, and usage patterns for improving our services.</li>
            <li><strong>Session Data:</strong> Conversation history with the assistant to personalize the experience (optional).</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">Your information may be used for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>To provide and improve our services.</li>
            <li>To communicate with you, if necessary.</li>
            <li>To ensure compliance with legal obligations.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Data Storage and Security</h2>
          <p className="text-gray-700">
            We use industry-standard security measures to protect your information. However, no method of transmission over the internet is completely secure, and we cannot guarantee the absolute security of your data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Third-Party Services</h2>
          <p className="text-gray-700">
            We may use third-party services, such as hosting providers or analytics tools, which may collect and process your data according to their own privacy policies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
          <p className="text-gray-700">
            You have the right to access, modify, or delete the personal information we hold about you. You may also request that we cease processing your data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Changes to This Privacy Policy</h2>
          <p className="text-gray-700">
            We may update this policy from time to time. We will notify you of any changes by posting the new policy on this page.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions or concerns about this Privacy Policy, please contact us at: [Your Contact Email]
          </p>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;
