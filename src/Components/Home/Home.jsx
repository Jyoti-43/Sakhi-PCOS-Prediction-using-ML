import React from "react";
import "./home.css";

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
                hormonal disorder among women. We have developed this app to
                help women with polycystic ovary syndrome <abbr> (PCOS)</abbr>{" "}
                find information of the highest quality from leading experts in
                this field. It has been designed with women and for women with
                polycystic ovary syndrome. <br />
                <br />
                Having PCOS is a journey of learning about the condition, of
                understanding how it impacts your life and of what you can do to
                manage this. We are providing trustworthy information to learn
                about the condition and support you to find the healthiest
                possible lifestyle for you.
              </p>
              <button className="get-support">Get Support</button>
            </div>

            <div className="col-lg-6">
              <div className="img-section">
                <img
                  className="home-img"
                  src="../assets/img/pcos2.png"
                  alt="Photo"
                />
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
                PCOS Relief is a charitable organisation (Charity Number:
                SC051494) that has been established to provide support and
                advice to those who have been diagnosed with any of the four
                types of Polycystic Ovary Syndrome (PCOS). PCOS Relief will
                assist bringing the forefront the actual condition itself and
                highlight the possible preventative measures and support that is
                available.
              </p>
            </div>
          </div>
          <div className="text col-lg-6 ">
            <div className="text-box">
              <p>
                We will develop a strategy of Campaigns to raise awareness about
                PCOS and the impact it can have on females. We will be doing
                this by engaging with Independent Medical Professionals as well
                as the NHS and the Scottish / UK Government to reach out to the
                wider public.
              </p>
            </div>
            <button className="get-support">Get Support</button>
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
              <button className="get-support">Get Support</button>
            </div>
          </div>

          <div className="text-section row">
            <div className="col-lg-6">
              <div className="text-box">
                <h3>
                  Worldwide, polycystic ovary syndrome (PCOS) affects 1 in 10
                  women, making it the most common endocrine disorder in women
                  of childbearing age.
                </h3>
              </div>
              <button className="get-support">Get Support</button>
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
        <div className="home-section-3">
          <div className="section-3">
            <div className="row">
              <div className="col-lg-6">
                <div className="text-box">
                  <h1>Our Purposes</h1>
                </div>
                <h3>
                  At PCOS Relief, we focus on advancing PCOS education,
                  promoting health, and fostering equality. We collaborate with
                  professionals and communities to collect data, provide
                  resources for symptom management, and raise
                  awareness—particularly within Ethnic Minority communities.
                </h3>
              </div>
              
                  <div className="col-lg-6">
                    <div className="text-box">
                      <h3>Advancing PCOS Education</h3>
                      <p>
                        We provide educational resources to help individuals
                        understand PCOS and its impact on their health.
                      </p>
                    </div>
                  
                    <div className="text-box">
                      <h3>Promoting Health</h3>
                      <p>
                        We offer resources to help individuals manage their
                        symptoms and improve their health.
                      </p>
                    </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default Home;
