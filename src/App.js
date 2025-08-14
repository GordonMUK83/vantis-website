import React from 'react';
import './App.css';
import { Users, BarChart2, Database, PenTool, Code, MessageCircle } from 'lucide-react';

function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="logo">Vantis</div>
        <nav className="nav-links">
          <a href="#companies">For Companies</a>
          <a href="#talent">For Talent</a>
          <a href="#solution">Our Solution</a>
          <a href="#ir35">IR35 Audit</a>
          <a href="#about">About Us</a>
        </nav>
        <a href="#contact" className="contact-button">Contact Us</a>
      </header>

      <main>
        <section className="main-content">
          <p className="tagline">For UK Companies</p>
          <h1>Increase Your Output, Not Your Payroll.</h1>
          <p className="description">
            In a hostile UK hiring market with soaring employment costs, growing your team is painfully
            expensive. Vantis offers a strategic, socially responsible alternative: access elite, UK-vetted
            African talent that is both 100% IR35 compliant and remarkably cost-effective.
          </p>
        </section>

        <section className="services">
          <div className="service-item">
            <h2>Social Media</h2>
            <p>Amplify your brand voice. Our social media experts create engaging content that converts followers into customers.</p>
          </div>
          <div className="service-item">
            <h2>Virtual Assistants</h2>
            <p>Reclaim your time. Delegate administrative tasks to a dedicated VA and focus on what truly matters.</p>
          </div>
          <div className="service-item">
            <h2>Data Entry</h2>
            <p>Ensure accuracy and efficiency. Our specialists handle your data with precision, powering your business intelligence.</p>
          </div>
          <div className="service-item">
            <h2>Marketing</h2>
            <p>Drive measurable growth. From strategy to execution, our marketing pros become your engine for expansion.</p>
          </div>
          <div className="service-item">
            <h2>Graphic Design</h2>
            <p>Captivate your audience. Get stunning visuals that define your brand and make a lasting impression.</p>
          </div>
          <div className="service-item">
            <h2>Tech Specialists</h2>
            <p>Build with the best. Access skilled developers and tech experts to bring your digital products to life.</p>
          </div>
        </section>
        
        <nav className="bottom-links">
          <a href="#social" className="bottom-link"><MessageCircle size={18} /> Social Media</a>
          <a href="#va" className="bottom-link"><Users size={18} /> Virtual Assistants</a>
          <a href="#data" className="bottom-link"><Database size={18} /> Data Entry</a>
          <a href="#marketing" className="bottom-link"><BarChart2 size={18} /> Marketing</a>
          <a href="#design" className="bottom-link"><PenTool size={18} /> Graphic Design</a>
          <a href="#tech" className="bottom-link"><Code size={18} /> Tech Specialists</a>
        </nav>
      </main>
    </div>
  );
}

export default App;
