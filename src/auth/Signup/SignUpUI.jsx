import AuthPage from "../../UI/AuthPage"

// Styles
import styles from "./styles/styles.module.css"

const SignupUI = ({ pageData, children }) => {
	return (
		<AuthPage {...pageData}>
			<div className={styles.CreateAccount}>
				<div className={styles.CreateAccount_Header}>
					<h2>Create Account</h2>
					<p>{pageData?.formInfo || "Information about timeline"}</p>
				</div>
				<div className={styles.CreateAccount_Container}>
					{children}
				</div>
			</div>
		</AuthPage>
	)
}

export default SignupUI