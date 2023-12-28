import "./MainPromo.css";
import heroImg from "../../images/fest-hero-cover.png"

function MainPromo() {
  return (
    <main className="main-promo">
      <section className="hero">
        <img className="hero__image" src={heroImg} alt="hero image from fantastic night movie fest in a desert"/>
        <div className="hero__content-container">
          <div className="hero__header-container">
            <h1 className="hero__header">Discover the Edge of Change</h1>
            <p className="hero__text">Explore the World's Finest Documentaries on New<span className="space"/>Culture</p>
          </div>
          <button className="hero__button">Start Now</button>
        </div>
      </section>
    </main>
  );
}

export default MainPromo;
