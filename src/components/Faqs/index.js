import './index.css'

const Faqs = props => {
  const {faqDetails} = props
  const {answer, category, question} = faqDetails
  return (
    <div>
      <h1>{question}</h1>
    </div>
  )
}
export default Faqs
