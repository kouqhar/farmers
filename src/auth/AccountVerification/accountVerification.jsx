import { useState } from "react"
import { Link } from "react-router-dom"
import AuthPage from "../../UI/AuthPage"
import {
	VerificationGridImage,
	VerificationAttention,
	VerificationSuccessful,
	InvalidAlertImage
} from "../../assets/images"

// Styles
import styles from "./styles/styles.module.css"

const AccountVerification = ({ children }) => {
	const [veri, setVeri] = useState({
		isSuccess: false, isPending: false
	})
	const [isBtnDisabled, setIsBtnDisabled] = useState(true)
	const [code, setCode] = useState([])
	const [phoneNumber, setPhoneNumber] = useState("+2348123456789")
	const goToMarketPlace = <button className={["btn_fullTrans", styles.content_verificationText__btn___fullGreen].join(" ")}>Go to Marketplace</button>


	const pageData = {
		image: VerificationGridImage,
		alt: "Account Verification"
	}

	const handleVerificationCode = e => {
		e.preventDefault()
		const value = e.target.value

		setCode(prevCode => {
			if (typeof Number(value) !== "number" || !value) return prevCode
			else return [...prevCode, Number(value)]
		})

		code.length === 4 ? setIsBtnDisabled(false) : setIsBtnDisabled(true)
	}

	return (
		<AuthPage {...pageData}>
			<div className={styles.content}>
				<div className={styles.content_verificationImage}>
					<img
						src={veri?.isPending && !veri?.isSuccess ? InvalidAlertImage : veri?.isSuccess ? VerificationSuccessful : VerificationAttention}
						alt={veri?.isPending && !veri?.isSuccess ? "Approval Pending" : `Verification ${veri?.isSuccess ? "Successful" : "Attention"}`} />
				</div>
				<div className={styles.content_verificationText}>
					<h2>{veri?.isPending && !veri?.isSuccess ? "Approval Pending" : `Verification ${veri?.isSuccess ? "Successful" : "Required"}`}</h2>
					<p>{veri?.isPending && !veri?.isSuccess ? "You will gain full access to dashboard upon Successful approval."
						: veri?.isSuccess ?
							"Your account has been verified, you can now \n proceed to your dashboard." :
							`A 5-digit verification code has been sent to \n ${phoneNumber}`
					}
					</p>
					<div className={styles.content_verificationText__btn}>
						{
							veri?.isPending && !veri?.isSuccess ? <button className={["", styles.content_verificationText__btn___fullGreen].join(" ")}>Go to Marketplace</button>
								: veri?.isSuccess ?
									(
										<>
											<button className={styles.content_verificationText__btn___fullGreen}>Go to Dashboard</button>
											<div className={styles.content_verificationText__btn___marketplace}>
												<p>You can explore different products in FWH Marketplace</p>
												{goToMarketPlace}
											</div>
										</>
									) :
									(
										<>
											<h3>Enter Verification Code</h3>
											<div className={styles.otp}>
												{
													[0, 1, 2, 3, 4].map(elem =>
														<input
															maxLength="1"
															onChange={handleVerificationCode}
															value={code[elem]} key={elem + 2} />
													)
												}
											</div>
											<button
												className={styles.content_verificationText__btn___fullGreen}
												disabled={isBtnDisabled}>Continue</button>
											<p>Didn't recieve the code? <span>Click to resend</span></p>

										</>
									)
						}
						<p> Click either !!!
							<small
								onClick={() => setVeri(prev => ({
									...prev,
									isSuccess: !prev.isSuccess
								}))}>   Is Verified</small> -
							<small
								onClick={() => setVeri(prev => ({
									...prev,
									isPending: !prev.isPending
								}))}>
								Is Pending</small>
						</p>
					</div>
				</div>
			</div>
		</AuthPage>
	)
}

export default AccountVerification