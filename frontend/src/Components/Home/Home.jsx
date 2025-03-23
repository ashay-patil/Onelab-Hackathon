import { useOutletContext } from "react-router-dom";
import "./Home.css";

const Home = () => {
    const { user } = useOutletContext();

    return (
        <div className="home">
            <h1>Welcome to AI-Based Deepfake & Fake News Detection System</h1>

            <section className="intro">
                <p>
                    Deepfake image recognition and fake news detection are critical in today's digital landscape, where misinformation and deceptive content can spread rapidly, impacting public opinion, personal reputations, and societal trust.
                </p>
            </section>

            <section className="deepfake-section">
                <h2>🔍 Importance of Deepfake Image Recognition</h2>

                <p>
                    Deepfakes are hyper-realistic digital falsifications created using advanced artificial intelligence, making it challenging to distinguish them from authentic content. These manipulations can depict individuals saying or doing things they never did, leading to potential misuse in various domains, including politics, entertainment, and personal relationships.
                </p>

                <img src="https://tse3.mm.bing.net/th?id=OIP.BTmUYsjO2gK48EsideQV-wHaEd&pid=Api" alt="Deepfake Image Example" className="info-image" />

                <h3>📊 Key Statistics:</h3>
                <ul>
                    <li>Approximately <strong>60%</strong> of consumers have encountered a deepfake video within the last year.</li>
                    <li>Human detection of deepfake images averages only <strong>62% accuracy</strong>, meaning nearly 4 out of 10 deepfakes go unnoticed.</li>
                    <li>There has been a <strong>tenfold increase</strong> in detected deepfakes globally across industries in 2023.</li>
                </ul>
            </section>

            <section className="fake-news-section">
                <h2>📰 Importance of Fake News Detection</h2>

                <p>
                    Fake news refers to false or misleading information presented as news, aiming to deceive readers for political, financial, or sensational gain. The rapid dissemination of fake news can lead to misinformed citizens, skewed public discourse, and, in extreme cases, social unrest.
                </p>

                <img src="https://tse1.mm.bing.net/th?id=OIP.SYlJRy8x3SpDqWXYF2tr0gHaFL&pid=Api" alt="Fake News Detection" className="info-image" />

                <h3>📊 Key Statistics:</h3>
                <ul>
                    <li>Only <strong>38%</strong> of students have received guidance on how to identify AI-generated content.</li>
                    <li>Just <strong>22%</strong> of students feel very confident in detecting whether an image is AI-generated or human-made.</li>
                    <li>A significant portion of the public struggles to distinguish between legitimate news and fabricated stories on social media platforms.</li>
                </ul>
            </section>

            <section className="implications">
                <h2>⚠️ Implications for Society</h2>

                <p>
                    The proliferation of deepfakes and fake news undermines trust in media, institutions, and digital content. They can influence elections, damage reputations, incite violence, and erode societal cohesion. As these technologies become more sophisticated, the challenge of detection intensifies, requiring advanced solutions and public education.
                </p>
            </section>

            <section className="conclusion">
                <h2>✅ Conclusion</h2>

                <p>
                    Addressing the challenges posed by deepfakes and fake news is essential for maintaining an informed and trust-based society. Investments in detection technologies and public education on media literacy are crucial to mitigate the adverse effects of misinformation and digital deception.
                </p>
            </section>
        </div>
    );
};

export default Home;