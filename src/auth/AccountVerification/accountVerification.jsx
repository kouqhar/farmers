import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

// dir
import axiosRequest from "../../utils/axiosFunc"
import AuthPage from "../../UI/AuthPage"
import {
	VerificationGridImage,
	VerificationAttention,
	VerificationSuccessful,
	InvalidAlertImage
} from "../../assets/images"

// Styles
import styles from "./styles/styles.module.css"

const INITIAL_CODE = {
	"0": "",
	"1": "",
	"2": "",
	"3": "",
	"4": "",
}

const AccountVerification = ({ children }) => {
	const [verificationResponse, setVerificationResponse] = useState({})
	const [user, setUser] = useState({})
	const [toastify, setToastify] = useState(false)
	const [isBtnDisabled, setIsBtnDisabled] = useState(true)
	const [veri, setVeri] = useState({
		isSuccess: false, isPending: false
	})
	const [code, setCode] = useState(INITIAL_CODE)
	const [phoneNumber, setPhoneNumber] = useState("+2348123456789")
	const goToMarketPlace = <button className={["btn_fullTrans", styles.content_verificationText__btn___fullGreen].join(" ")}>Go to Marketplace</button>

	useEffect(() => {
		setIsBtnDisabled(!Object.values(code).every(elem => elem.length === 1))
	}, [code])

	useEffect(() => {
		const getUser = localStorage.getItem("newUser")
		const convertUserToObj = JSON.parse(getUser)

		setUser(convertUserToObj)
	}, [verificationResponse])

	const displayToastify = (duration = 7000) => {
		const displayToastify = setTimeout(() => {
			setToastify(false)
		}, duration);

		return () => clearTimeout(displayToastify)
	}

	const pageData = {
		image: VerificationGridImage,
		alt: "Account Verification"
	}

	const handleVerificationCode = e => {
		e.preventDefault()
		const [id, value] = [e.target.id, e.target.value]
		setCode(prevState => ({ ...prevState, [id]: value }))
		// if (/[0-9]/.test(value)) 
	}

	const handleVerificationCodeResend = async () => {
		setCode(INITIAL_CODE)
		const credential = user?.data?.newUser?.credential

		if (credential) {
			const userResendVerificationPath = "/users/resend_verification_code"
			const cancelToken = axios.CancelToken.source();
			const reqOptions = {
				path: userResendVerificationPath,
				cancelToken: cancelToken.token,
				method: "POST",
				data: { credential }
			};

			const response = await axiosRequest(reqOptions);

			if (response) {
				setToastify(true)

				if (!response.status) {
					setVerificationResponse({ data: `${response?.data?.message}, Please try again!!!`, status: "500" })

					displayToastify()
				} else {
					if (response?.status !== 200) {
						setVerificationResponse({ data: `${response?.data?.response?.data?.message}, Please try again!!!`, status: response?.status })

						displayToastify()
					}
					else {
						setVerificationResponse({ data: response?.data?.message, status: response?.status, response: response?.data })
						localStorage.setItem("newUser", JSON.stringify({ ...user, ...response?.data }))

						const redirectToVerifyPage = setTimeout(() => {
							setToastify(false)
						}, 3000);

						return () => clearTimeout(redirectToVerifyPage)
					}
				}
			}

			return () => {
				cancelToken.cancel();
			};
		}
	}

	const handleCodeVerification = async () => {
		const credential = user?.data?.newUser?.credential

		if (credential) {
			const inputCode = Object.values(code).join("")
			const userVerificationPath = "/users/verify_account"
			const cancelToken = axios.CancelToken.source();
			const reqOptions = {
				path: userVerificationPath,
				cancelToken: cancelToken.token,
				method: "PUT",
				data: { credential, code: inputCode }
			};

			const response = await axiosRequest(reqOptions);

			if (response) {
				setToastify(true)

				if (!response.status) {
					setVerificationResponse({ data: `${response?.data?.message}, Please try again!!!`, status: "500" })

					displayToastify()
				} else {
					if (response?.status !== 200) {
						setVerificationResponse({ data: `${response?.data?.response?.data?.message}, Please try again!!!`, status: response?.status })

						setVeri(prev => ({
							...prev,
							isSuccess: false
						}))

						displayToastify()
					}
					else {
						const [firstName, lastName] = response?.data?.data?.user
						const message = `Congratulations, successfully verified ${firstName} ${lastName}!!!`
						setVerificationResponse({ data: message, status: response?.status, response: response?.data })
						localStorage.setItem("newUser", JSON.stringify(response?.data))

						const redirectToVerifyPage = setTimeout(() => {
							setToastify(false)
							setVeri(prev => ({
								...prev,
								isSuccess: true
							}))
						}, 3000);

						return () => clearTimeout(redirectToVerifyPage)
					}
				}

			}

			return () => {
				cancelToken.cancel();
			};
		}
	}

	return (
		<AuthPage {...pageData}>
			{
				toastify && (
					<section className={["Toastify", verificationResponse?.status !== 200 ? "info" : "success"].join(" ")}>
						<button
							className="ToastifyBtn"
							onClick={() => setToastify(false)}>x</button>
						<p>
							{verificationResponse?.data}
						</p>
					</section>
				)
			}
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
							`A 5-digit verification code has been sent to \n ${user?.data?.newUser?.credential || phoneNumber}`
					}
					</p>
					<p>{user?.sms}</p>
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
													["0", "1", "2", "3", "4"].map(elem =>
														<input
															key={`vericode-${elem}`}
															maxLength="1"
															onChange={handleVerificationCode}
															value={code[elem]}
															id={elem} />
													)
												}
											</div>
											<button
												className={styles.content_verificationText__btn___fullGreen}
												onClick={handleCodeVerification}
												disabled={isBtnDisabled}>Continue</button>
											<p>Didn't recieve the code? <Link onClick={handleVerificationCodeResend}>Click to resend</Link></p>

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