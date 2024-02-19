import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

// dir
import TimeLineOne from "./TimeLineOne"
import TimeLineTwo from "./TimeLineTwo"
import TimeLineThree from "./TimeLineThree"
import TimeLineFour from "./TimeLineFour"
import axiosRequest from '../../utils/axiosFunc'

// Styles
import styles from "./styles/styles.module.css"


const Signup = () => {
	const [signupResponse, setSignupResponse] = useState({})
	const [toastify, setToastify] = useState(false)
	const [naviIndex, setNaviIndex] = useState(0)
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		siteId: "",
		userDetails: {},
		idUpload: {
			idType: "",
			url: "https://"
		},
		bankDetails: {},
		farmDetails: []
	})
	const handleNaviIndex = (id) => {
		if (id === 0) return
		else setNaviIndex(id - 1)
	}

	const handleFormData = async (data) => {
		if (data.length > 2) {
			const [formField, hasBankAccount, hasSmartphone] = data
			if (formField == "hasBankAndPhone") {

				setFormData(prevState => ({
					...prevState,
					["userDetails"]: {
						...prevState.userDetails,
						hasBankAccount,
						hasSmartphone,
					}
				}))
			}
		} else {
			const [formField, formValue] = data

			if (formField === "userDetails") {
				setFormData(prevState => ({
					...prevState,
					siteId: formValue?.siteId,
					idUpload: {
						...prevState.idUpload,
						idType: formValue?.idType
					}
				}))
			}

			setFormData(prevState => ({ ...prevState, [formField]: formValue }))

			if (formField === "farmDetails") {
				const ageRange = Number(formData.userDetails.ageGroup) + 9

				formData.userDetails.profilePic = { url: formData.userDetails.profilePic || "https://" }
				formData.userDetails.credential = `+234${formData.userDetails.credential}`
				formData.userDetails.ageGroup = `${formData.userDetails.ageGroup} - ${ageRange}`

				const newUser = { ...formData }

				delete newUser?.userDetails?.siteId
				delete newUser?.userDetails?.confirmPassword
				delete newUser?.userDetails?.documentImage
				delete newUser?.userDetails?.idNumber
				delete newUser?.userDetails?.idType

				const userSignupPath = "/users/signup"
				const cancelToken = axios.CancelToken.source();
				const reqOptions = {
					path: userSignupPath,
					cancelToken: cancelToken.token,
					method: "POST",
					data: { ...newUser }
				};

				const response = await axiosRequest(reqOptions);
				if (response) {
					setToastify(true)

					if (response?.status !== 200) {
						setSignupResponse({ data: `${response?.data?.response?.data?.message}, Please try again!!!`, status: response?.status })

						const displayToastify = setTimeout(() => {
							setToastify(false)
						}, 7000);

						return () => clearTimeout(displayToastify)
					}
					else {
						setSignupResponse({ data: response?.data?.message, status: response?.status, response: response?.data })
						localStorage.setItem("newUser", JSON.stringify(response?.data))

						const redirectToVerifyPage = setTimeout(() => {
							setToastify(false)
							navigate("/verify")
						}, 3000);

						return () => clearTimeout(redirectToVerifyPage)
					}

				}

				return () => {
					cancelToken.cancel();
				};
			}

		}
	}

	const handleNextNavi = () => setNaviIndex(naviIndex + 1)
	const TIMELINES = [
		<TimeLineOne handleNaviIndex={handleNaviIndex} handleNextNavi={handleNextNavi} handleFormData={handleFormData} />,
		<TimeLineTwo handleNaviIndex={handleNaviIndex} handleNextNavi={handleNextNavi} handleFormData={handleFormData} />,
		<TimeLineThree handleNaviIndex={handleNaviIndex} handleNextNavi={handleNextNavi} handleFormData={handleFormData} />,
		<TimeLineFour handleNaviIndex={handleNaviIndex} handleNextNavi={handleNextNavi} handleFormData={handleFormData} />]


	return <>
		{
			toastify && (
				<section className={["Toastify", signupResponse?.status !== 200 ? "info" : "success"].join(" ")}>
					<button
						className="ToastifyBtn"
						onClick={() => setToastify(false)}>x</button>
					<p>
						{signupResponse?.data}
					</p>
				</section>
			)
		}

		{/* Pages */}
		{
			TIMELINES[naviIndex]
		}
	</>
}

export default Signup