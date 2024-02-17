import { Link } from "react-router-dom"
import { GoBack } from "../../assets/images"

// Styles
import styles from "./styles/styles.module.css"

const AuthPage = ({ children, image, alt, isLoginPage = false }) => {
	return (<div className={styles.ContainerGrid}>

		<div className={styles.ContainerGrid_gridOne}>
			<div className={styles.ContainerGrid_gridOne__image}>
				<img src={image} alt={alt} />
			</div>
		</div>

		<div className={styles.ContainerGrid_gridTwo}>
			<div className={styles.ContainerGrid_gridTwo__navi}>
				<div className={styles.ContainerGrid_gridTwo__navi___goBack}>
					<img src={GoBack} alt="Go Back" />
					<p>Back home</p>
				</div>
				{
					!isLoginPage && (
						<div className={styles.ContainerGrid_gridTwo__navi__account}>
							<p>Already have an account?
								<Link to="/login"> Log in</Link>
							</p>
						</div>)
				}
			</div>
			<div className={styles.ContainerGrid_gridTwo__container}>
				<div className={styles.ContainerGrid_gridTwo__container___content}>
					{children}
				</div>
			</div>
		</div>
	</div>)
}

export default AuthPage