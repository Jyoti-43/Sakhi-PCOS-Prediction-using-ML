import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="main-part">
          <div className="row section">
            <div className="text col-lg-6 ">
              {/* <h1 className="">Sakhi: <pre> PCOS Prediction System. </pre> </h1> */}
              {/* <h1 className="">Get PCOS Prediction<pre>with Sakhi</pre>  </h1> */}
              <h1 className="">
                Welcome to<pre id="sakhi">Sakhi </pre>
              </h1>
              <p className="lead">
                Sakhi is a platform that provides a information about
                Reproductive health and hygiene. It also provides a platform to
                diagnosis the Reproductive health issues such as PCOS. <br />
                <br />
                Polycystic Ovary Syndrome <abbr>(PCOS)</abbr> is a common
                hormonal disorder among women.
                {/*  We have developed this app to
                help women with polycystic ovary syndrome <abbr> (PCOS)</abbr>{" "}
                find information of the highest quality from leading experts in
                this field. <br /> */}
                It has been designed with women and for women with polycystic
                ovary syndrome. <br />
                <br />
                {/* Having PCOS is a journey of learning about the condition, of
                understanding how it impacts your life and of what you can do to
                manage this. We are providing trustworthy information to learn
                about the condition and support you to find the healthiest
                possible lifestyle for you. */}
              </p>
              <Link to="/contact">
                <button className="get-support">Get Support</button>
              </Link>
            </div>

            <div className="col-lg-6">
              <div className="img-section">
                <img
                  className="home-img"
                  src="../assets/img/image.png"
                  alt="Photo"
                  style={{ width: "100%", height: "50" }}
                />
                {/* <img
                  className="home-img"
                  src="../assets/img/photo1.png"
                  alt="Photo"
                  style={{ width: "100%" , height: "70%"}}
                /> */}
              </div>
            </div>
          </div>
        </div>

        {/* second row started */}
        <div className="home-section-1 row">
          <div className="text-heading">
            <h1>Who we are?</h1>
          </div>
          <div className="text col-lg-6">
            <div className="text-box">
              <p>
                Sakhi is dedicated to supporting women diagnosed with Polycystic
                Ovary Syndrome (PCOS) by raising awareness about its impact on
                physical, emotional, and reproductive health. By integrating
                innovative tools like machine learning for early diagnosis with
                personalized care strategies, Sakhi aims to promote preventive
                measures and provide accessible resources to improve health
                outcomes.
              </p>
            </div>
          </div>
          <div className="text col-lg-6 ">
            <div className="text-box">
              <p>
                Through impactful campaigns, Sakhi highlights the challenges
                posed by PCOS while advocating for better awareness and care.
                Our focus remains on educating the public and fostering a
                supportive space where women can access knowledge, tools, and
                encouragement to manage their health and well-being effectively.
              </p>
            </div>
            <Link to="/contact">
              <button className="get-support">Get Support</button>
            </Link>
          </div>
        </div>

        <div className="home-section-3">
          <div className="section-3">
            <div className="row objective-row">
              <div className="main-purpose col-lg-6">
                <div className="text-box">
                  <h1>Our Objectives</h1>
                  {""}
                </div>
                <h3>
                  At Sakhi, we empower women with PCOS by raising awareness,
                  offering symptom management resources, and using advanced
                  analytics to predict PCOS risk for early intervention, helping
                  them take control of their reproductive health.
                </h3>
              </div>
              <div className="sub-purpose col-lg-6">
                <div className="purpose row">
                  <div className="purpose-title">
                    <h3>PCOS Prediction:</h3>
                  </div>
                  <h3>
                    Analyze non-clinical data using advanced algorithms to
                    assess PCOS risk, reducing dependency on extensive medical
                    tests.
                  </h3>
                </div>
                <div className="purpose row">
                  <div className="purpose-title">
                    <h3>Menstrual Health Tracking:</h3>
                  </div>
                  <h3>
                    Provide a smart period tracker to monitor cycles, detect
                    irregularities, and offer insights for better reproductive
                    health.
                  </h3>
                </div>

                {/* <div className="purpose row">
                  <div className="purpose-title">
                    <h3> Offer Accessible Resources</h3>
                  </div>
                  <h3>
                    Sakhi will be user-friendly platforms to share
                    scientifically backed information and tools for tracking
                    Period and predicting PCOS .{" "}
                  </h3>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* third row started */}
        <div className="home-section-2 ">
          <div className="text-heading">
            <h1>Did you know?</h1>
            <hr style={{ border: "1px solid #e71cb4", width: "100%" }} />
          </div>

          <div className="text-section row">
            <div className="col-lg-6">
              <div className="image-box">
                <img
                  className="home-img"
                  src="../assets/img/image2.png"
                  alt="Photo"
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="text-box">
                <h3>
                  Worldwide, polycystic ovary syndrome (PCOS) affects 1 in 10
                  women, making it the most common endocrine disorder in women
                  of childbearing age.
                </h3>
              </div>
              <Link to="/contact">
                <button className="get-support">Get Support</button>
              </Link>
            </div>
          </div>

          <div className="text-section row">
            <div className="col-lg-6">
              <div className="text-box">
                <h3>
                  Polycystic ovary syndrome, or PCOS, has become a common
                  problem among ethnic minority women in the past few years. One
                  in every five ethnic minority women is affected by this
                  condition.
                </h3>
              </div>
              <Link to="/contact">
                <button className="get-support">Get Support</button>
              </Link>
            </div>

            <div className="col-lg-6">
              <div className="image-box">
                <img
                  className="home-img"
                  src="../assets/img/image3.png"
                  alt="Photo"
                />
              </div>
            </div>
          </div>
        </div>
        {/*  Fourth row started */}
      </div>
    </>
  );
};

export default Home;
