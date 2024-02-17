import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import FormGroup from "../../UI/FormGroup"
import SignUpUI from "./SignUpUI"
import { AccountOneImage, FlagNGN, GreenCheckCircle, InvalidAlertImage, Avatar, EyeOffImage } from "../../assets/images"

// Styles
import styles from "./styles/styles.module.css"

const ID_TYPE = [
	{
		type: "National ID Card (NIN)"
	},
	{
		type: "Voters Card"
	},
	{
		type: "International Passport"
	},
]

const SITES = [
	{
		name: "Ajegunle"
	},
	{
		name: "Ikeja"
	},
	{
		name: "VI"
	},
	{
		name: "Surulere"
	},
	{
		name: "Festac"
	},
]

const InitialState = {
	firstName: "",
	lastName: "",
	phoneNumber: "",
	emailAddress: "",
	age: "",
	gender: "",
	residentialAddress: "",
	site: "",
	idType: "",
	idNumber: "",
	documentImage: "",
	createPassword: "",
	confirmPassword: "",
	profilePicture: "",
}

const isValidIcon = check => check ? GreenCheckCircle : InvalidAlertImage

const TimeLineOne = ({ handleNaviIndex, handleNextNavi }) => {
	const [userDetails, setUserDetails] = useState(InitialState)
	const [isToNextBtnDisabled, setIsToNextBtnDisabled] = useState(true)
	const [isPasswordValid, setIsPasswordValid] = useState(false)
	const [isFieldsValid, setIsFieldsValid] = useState(false)
	const [isShowPassword, setIsShowPassword] = useState({
		createPassword: false,
		confirmPassword: false,
	})
	const [validationColor, setValidationColor] = useState({
		length: false,
		specialChar: false,
		isMatch: false
	})
	const pageData = {
		image: AccountOneImage,
		alt: "Personal Information",
		formInfo: "Personal Information"
	}

	const handleisShowPassword = e => {
		const [fieldName] = [e.target.name]
		setIsShowPassword(prevState => ({
			...prevState,
			[fieldName]: !prevState[fieldName]
		}))
	}

	// Fields validation
	useEffect(() => {
		if (userDetails.firstName && userDetails.lastName && userDetails.phoneNumber && userDetails.age && userDetails.gender && userDetails.residentialAddress && userDetails.site && userDetails.idType && userDetails.idNumber)
			setIsFieldsValid(true)
		else setIsFieldsValid(false)

	}, [userDetails.firstName, userDetails.lastName, userDetails.phoneNumber, userDetails.age, userDetails.gender, userDetails.residentialAddress, userDetails.site, userDetails.idType, userDetails.idNumber])

	// Password validation
	useEffect(() => {
		setValidationColor({
			length: userDetails?.createPassword.length >= 8,
			specialChar: userDetails?.createPassword.split("").some(elem => elem.match(/['!'|'@'|'#'|'$'|'%'|'^'|'&'|'*']/g)),
			isMatch: userDetails?.createPassword.trim() === userDetails?.confirmPassword.trim()
		})

		if (validationColor?.length && validationColor?.specialChar && validationColor?.isMatch)
			setIsPasswordValid(true)
		else setIsPasswordValid(false)
	}, [userDetails.createPassword, userDetails.confirmPassword])

	const handleInputChange = e => {
		e.preventDefault()
		const [fieldName, fieldValue] = [e.target.name, e.target.value]
		// console.log(fieldName, e.target.files[0])

		setUserDetails(prevState => ({
			...prevState,
			[fieldName]: fieldValue
		}))
	}

	return (
		<SignUpUI pageData={pageData}>
			<div className={styles.content}>
				<FormGroup className={styles.content_formNames}>
					<div className={styles.content_formNames__firstName}>
						<label>First Name * </label>
						<input
							onChange={handleInputChange}
							value={userDetails?.firstName}
							placeholder="Enter first name"
							name="firstName"
							required />
					</div>
					<div className={styles.content_formNames__lastName}>
						<label>Last Name *</label>
						<input
							onChange={handleInputChange}
							value={userDetails?.lastName}
							placeholder="Enter last name"
							name="lastName"
							required />
					</div>
				</FormGroup>
				<FormGroup className={styles.content_formNumber}>
					<label>Phone Number * </label>
					<div className={styles.content_formNumber__number}>
						<div className={styles.content_formNumber__number___flag}>
							<img src={FlagNGN} alt="National Flag" />
						</div>
						<div className={styles.content_formNumber__number___countrycode}>
							<div className={styles.content_formNumber__number___code}>
								<p>+234</p>
							</div>
							<input
								onChange={handleInputChange}
								value={userDetails?.phoneNumber}
								placeholder="00 000 000 00"
								name="phoneNumber"
								maxLength="11"
								required />
						</div>
					</div>
				</FormGroup>
				<FormGroup className={styles.content_formEmail}>
					<div className={styles.content_formEmail__email}>
						<label>Email address (optional) </label>
						<input
							onChange={handleInputChange}
							type="email"
							value={userDetails?.emailAddress}
							placeholder="Enter email address"
							name="emailAddress"
							required />
					</div>
				</FormGroup>
				<FormGroup className={styles.content_formAgeGender}>
					<div className={styles.content_formAgeGender__age}>
						<label>Age * </label>
						<input
							onChange={handleInputChange}
							value={userDetails?.age}
							placeholder="Enter Age"
							name="age"
							required />
					</div>
					<div>
						<label>Choose Gender *</label>
						<div className={styles.content_formAgeGender__gender}>
							<div className={styles.content_formAgeGender__gender___male}>
								<input
									type="radio"
									onClick={() => setUserDetails(prevState => ({ ...prevState, gender: "male" }))}
									name="gender" />
								<span>Male</span>
							</div>
							<div className={styles.content_formAgeGender__gender___female}>
								<input
									type="radio"
									onClick={() => setUserDetails(prevState => ({ ...prevState, gender: "female" }))}
									name="gender" />
								<span>Female</span>
							</div>
						</div>
					</div>
				</FormGroup>
				<FormGroup className={styles.content_address}>
					<div className={styles.content_address__residence}>
						<label>Residential address * </label>
						<input
							onChange={handleInputChange}
							value={userDetails?.residentialAddress}
							placeholder="Enter residential address"
							name="residentialAddress"
							required />
					</div>
				</FormGroup>
				<FormGroup>
					<label>Site *</label>
					<div className={styles.content_site}>
						<select
							name="site"
							onChange={handleInputChange}>
							<option value={"Select site"}>{"Select site * "}</option>
							{
								SITES.map(({ name }, idx) => (<option key={name} value={name}>{name}</option>))
							}
						</select>
					</div>
				</FormGroup>
				<FormGroup>
					<label>ID Type *</label>
					<div className={styles.content_idType}>
						<select
							name="idType"
							onChange={handleInputChange}>
							<option value={"Select ID Type"}>{"Select ID TYPE * "}</option>
							{
								ID_TYPE.map(({ type }, idx) => (<option key={type} value={type}>{type}</option>))
							}
						</select>
					</div>
				</FormGroup>
				<FormGroup className={styles.content_idNumber}>
					<div className={styles.content_idNumber__number}>
						<label>ID Number * </label>
						<input
							onChange={handleInputChange}
							value={userDetails?.idNumber}
							placeholder="Enter ID Number"
							name="idNumber"
							required />
					</div>
				</FormGroup>
				<FormGroup className={styles.content_documentImage}>
					<div className={styles.content_documentImage__image}>
						<label>Upload ID document </label>
						<div className={styles.content_documentImage__image___scan}>
							<input
								onChange={handleInputChange}
								type="file"
								value={userDetails?.documentImage}
								name="documentImage" />
						</div>
					</div>
				</FormGroup>
				<FormGroup className={styles.content_password}>
					<div className={styles.content_password__create}>
						<div className={[styles.content_password__create___hideShow, "signupHideShow"].join(" ")}>
							<label>Create Password * </label>
							<img src={EyeOffImage} onClick={handleisShowPassword} name="createPassword" alt="Hide/show Password" />
						</div>
						<input
							onChange={handleInputChange}
							type={isShowPassword?.createPassword ? "text" : "password"}
							value={userDetails?.createPassword}
							placeholder="Create Password"
							name="createPassword"
							required />
					</div>
					<div className={styles.content_password__confirm}>
						<div className={[styles.content_password__confirm___hideShow, "signupHideShow"].join(" ")}>
							<label>Confirm Password * </label>
							<img src={EyeOffImage} onClick={handleisShowPassword} name="confirmPassword" alt="Hide/show Password" />
						</div>
						<input
							onChange={handleInputChange}
							type={isShowPassword?.confirmPassword ? "text" : "password"}
							value={userDetails?.confirmPassword}
							placeholder="Retype Password"
							name="confirmPassword"
							required />
					</div>
					<div className={styles.content_password__validation}>
						<p style={{ color: validationColor.length ? "green" : "red" }}>
							<img src={isValidIcon(validationColor?.length)} alt="Characters Validation" />
							Must be at least 8 characters
						</p>
						<p style={{ color: validationColor.isMatch ? "green" : "red" }}>
							<img src={isValidIcon(validationColor?.isMatch)} alt="Password Validation" />
							Passwords do not match
						</p>
						<p style={{ color: validationColor.specialChar ? "green" : "red" }}>
							<img src={isValidIcon(validationColor?.specialChar)} alt="Special Characters Validation" />
							Must contain one special character(#$%^&*)
						</p>
					</div>
				</FormGroup>
				<FormGroup className={styles.content_profilePicture}>
					<div className={styles.content_profilePicture__profile}>
						<label>Upload Profile Picture (optional) </label>
						<div className={styles.content_profilePicture__profile___avatar}>
							<img src={Avatar} alt="Profile Picture" />
							<input
								onChange={handleInputChange}
								type="file"
								value={userDetails?.profilePicture}
								name="profilePicture" />
						</div>
						<p>PNG or JPG<span>(Max 5MB)</span></p>
					</div>
				</FormGroup>
				<div className={["navigation_btn"].join(" ")}>
					<button onClick={() => handleNaviIndex(0)} className={["go_back"].join(" ")}>Back</button>
					<button
						// disabled={!isFieldsValid && !isPasswordValid} 
						onClick={handleNextNavi} className={["forward"].join(" ")}>Continue</button>
				</div>
			</div>

		</SignUpUI>
	)
}

export default TimeLineOne