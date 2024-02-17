// Styles
import styles from "./styles/styles.module.css"

const FormGroup = ({ children, className }) => <div className={[className, styles.FormGroup].join(" ")}>{children}</div>

export default FormGroup