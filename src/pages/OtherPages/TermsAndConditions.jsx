import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const TermsAndConditions = () => {
  return (
    <>
      <Navbar />

      <div className="terms_conditions container py-5">
        <h1 className="sec-title mb-4">Terms and Conditions</h1>

         <p>
          Welcome to <b>Healthy Home Match </b>! These Terms and Conditions outline the rules and regulations for the use of our website and services. By accessing or using our platform, you agree to comply with and be bound by the following terms.
        </p>

        <h2 className="mt-5">1. Acceptance of Terms</h2>
        <p>
          By accessing this website, you agree to be bound by these Terms and Conditions and all applicable laws. If you disagree with any part of the terms, you must not use our website.
        </p>

        <h2 className="mt-5">2. Changes to Terms</h2>
        <p>
          We reserve the right to update or modify these terms at any time without prior notice. Continued use of the website after changes have been posted will constitute your acceptance of the new terms.
        </p>

        <h2 className="mt-5">3. Use of the Website</h2>
        <ul>
          <li>You must be at least 18 years old to use this website.</li>
          <li>You agree not to use the website for any unlawful purpose.</li>
          <li>You may not interfere with or disrupt the security or accessibility of the website.</li>
          <li>Any content you submit must be truthful and not violate the rights of others.</li>
        </ul>

        <h2 className="mt-5">4. Property Listings</h2>
        <p>
          Property listings are provided for informational purposes only. We do not guarantee the accuracy or completeness of any listing and are not responsible for any errors or omissions.
        </p>

        <h2 className="mt-5">5. User Accounts</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account.
        </p>

        <h2 className="mt-5">6. Intellectual Property</h2>
        <p>
          All content on the website, including text, graphics, logos, and images, is the property of [Your Company Name] and is protected by copyright and trademark laws. You may not use, reproduce, or distribute any content without our written permission.
        </p>

        <h2 className="mt-5">7. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites. We are not responsible for the content or privacy practices of those sites and encourage users to review their policies.
        </p>

        <h2 className="mt-5">8. Limitation of Liability</h2>
        <p>
          We are not liable for any direct, indirect, incidental, or consequential damages resulting from your use of our website or services. This includes loss of data, profits, or property.
        </p>

        <h2 className="mt-5">9. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your access to our website at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users.
        </p>

        <h2 className="mt-5">10. Governing Law</h2>
        <p>
          These Terms are governed by and construed in accordance with the laws of [Your Country/State], and you submit to the non-exclusive jurisdiction of the courts located there for the resolution of any disputes.
        </p>

        <h2 className="mt-5">11. Contact Information</h2>
        <p>
          If you have any questions about these Terms and Conditions, please contact us at:
        </p>
        <p><strong>Email:</strong> support@yourcompany.com</p>
        <p><strong>Phone:</strong> +1 (000) 123-4567</p>
        <p><strong>Address:</strong> 123 Main Street, City, State, Zip</p>

        <p className="mt-3"><em>Last updated: August 7, 2025</em></p>
      </div>

      <Footer />
    </>
  );
};

export default TermsAndConditions;