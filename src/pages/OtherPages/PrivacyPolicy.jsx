import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />

      <div className="privacy_policy container py-5">
        <h1 className="sec-title mb-4">Privacy Policy</h1>

        <p>
          This Privacy Policy explains how <b>Healthy Home Match </b>("we", "us", or "our") collects, uses, and protects the information you provide to us when you use our website, including any services related to buying, selling, or renting real estate.
        </p>

        <h2 className="mt-5">1. Information We Collect</h2>
        <p>We may collect both personal and non-personal information from users in various ways, including, but not limited to:</p>
        <ul>
          <li>When you register on the site</li>
          <li>Fill out a form or contact us</li>
          <li>Subscribe to a newsletter or alert</li>
          <li>Use site features or interact with listings</li>
        </ul>
        <p>Personal data we collect may include:</p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Property preferences</li>
          <li>IP address and location data</li>
        </ul>

        <h2 className="mt-5">2. How We Use Your Information</h2>
        <p>We use the collected data for various purposes, such as:</p>
        <ul>
          <li>To personalize user experience and display content relevant to your interests</li>
          <li>To improve our website and customer service</li>
          <li>To process inquiries and deliver requested information or services</li>
          <li>To send periodic emails and promotional messages</li>
          <li>To detect, prevent, and address technical issues or security breaches</li>
        </ul>

        <h2 className="mt-5">3. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies, log files, and tracking tools like Google Analytics to understand how users interact with our website. Cookies help us remember user preferences and improve site performance. You may choose to set your browser to refuse cookies, but this may affect your ability to use some parts of the site.
        </p>

        <h2 className="mt-5">4. How We Protect Your Data</h2>
        <p>
          We adopt industry-standard security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. Our website is encrypted via SSL technology, and access to data is restricted to authorized personnel only.
        </p>

        <h2 className="mt-5">5. Sharing of Information</h2>
        <p>We do not sell, trade, or rent users’ personal identification information to others. However, we may share your data with:</p>
        <ul>
          <li>Trusted third-party vendors for analytics, advertising, or email delivery</li>
          <li>Government authorities when legally obligated to do so</li>
          <li>Our affiliates and real estate partners to help fulfill your request</li>
        </ul>

        <h2 className="mt-5">6. Third-Party Links</h2>
        <p>
          Our website may contain links to other websites. We are not responsible for the privacy practices of third-party websites. We encourage users to read their privacy policies before providing personal information.
        </p>

        <h2 className="mt-5">7. Your Rights Under GDPR and CCPA</h2>
        <p>If you are a resident of the European Economic Area (EEA) or California, you are entitled to certain rights regarding your personal data:</p>
        <ul>
          <li>Access to the personal data we hold about you</li>
          <li>The right to correct or delete your data</li>
          <li>The right to object or restrict data processing</li>
          <li>The right to data portability</li>
          <li>The right to withdraw consent at any time</li>
        </ul>
        <p>
          To exercise these rights, please contact us at <strong>privacy@mycompany.com</strong>.
        </p>

        <h2 className="mt-5">8. Children’s Privacy</h2>
        <p>
          Our services are not directed to individuals under the age of 13. We do not knowingly collect personal data from children. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete it.
        </p>

        <h2 className="mt-5">9. Data Retention</h2>
        <p>
          We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, including legal, accounting, or reporting requirements.
        </p>

        <h2 className="mt-5">10. Changes to This Privacy Policy</h2>
        <p>
          We reserve the right to modify this Privacy Policy at any time. Changes will be posted on this page with an updated revision date. We encourage users to check this page regularly for updates.
        </p>

        <h2 className="mt-5">11. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
        </p>
        <p><strong>Email: </strong> support@gmail.com</p>
        <p><strong>Phone: </strong> +1 (000) 123-4567</p>
        <p><strong>Address: </strong> #123 Main Street Road XYZ City </p>
      </div>

      <Footer />

    </>
  );
};

export default PrivacyPolicy;