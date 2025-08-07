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
       


      </div>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
