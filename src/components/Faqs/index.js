import './index.css'

const Faqs = props => {
  const {faqDetails} = props
  const {answer, category, question} = faqDetails
  return (
    <div className="faq-container">
      <p className="faq-question">{question}</p>
      <p className="faq-answer">{answer}</p>
    </div>
  )
}
export default Faqs
