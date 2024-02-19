import { useState } from "react"
import FormGroup from "../../UI/FormGroup"
import SignUpUI from "./SignUpUI"
import { AccountTwoImage } from "../../assets/images"

// Styles
import styles from "./styles/styles.module.css"

const BANKS = [
	{
		name: "GTB"
	},
	{
		name: "UBA"
	},
	{
		name: "UNION"
	},
	{
		name: "FIRST"
	},
]

const TimeLineTwo = ({ handleNaviIndex, handleNextNavi, handleFormData }) => {
	const [hasSmartphone, setHasSmartPhone] = useState(false)
	const [hasBankAccount, setHasBankAccount] = useState(false)
	const [bankDetails, setBankDetails] = useState({
		bankName: "",
		accountNumber: ""
	})
	const pageData = {
		image: AccountTwoImage,
		alt: "Bank Details",
		formInfo: "Bank Details"
	}

	const handleBankInputChange = e => {
		e.preventDefault()
		const [fieldName, fieldValue] = [e.target.name, e.target.value]

		setBankDetails(prevState => ({
			...prevState,
			[fieldName]: fieldValue
		}))
	}

	const sendTimelineTwo = e => {
		e.preventDefault()

		handleFormData(["bankDetails", bankDetails])
		handleFormData(["hasBankAndPhone", hasBankAccount, hasSmartphone])
		handleNextNavi()
	}

	return (
		<SignUpUI pageData={pageData}>
			<div className={styles.TimelineTwo}>
				<FormGroup>
					<label>Do you have a smartphone</label>
					<div className={[styles.TimelineTwo_SmartPhone, "radio_btn"].join(" ")}>
						<div className={styles.TimelineTwo_SmartPhone__yes}>
							<input
								type="radio"
								onClick={() => setHasSmartPhone(true)}
								name="smartphone" />
							<span>Yes</span>
						</div>
						<div className={styles.TimelineTwo_SmartPhone__no}>
							<input
								type="radio"
								onClick={() => setHasSmartPhone(false)}
								name="smartphone" />
							<span>No</span>
						</div>
					</div>
				</FormGroup>
				<FormGroup className={styles.TimelineTwo_BankContent}>
					<label>Do you have a Bank Account</label>
					<div className={[styles.TimelineTwo_BankAccount, "radio_btn"].join(" ")}>
						<div className={styles.TimelineTwo_BankAccount__yes}>
							<input
								type="radio"
								onClick={() => setHasBankAccount(true)}
								name="bankAccount" />
							<span>Yes</span>
						</div>
						<div className={styles.TimelineTwo_BankAccount__no}>
							<input
								type="radio"
								onClick={() => setHasBankAccount(false)}
								name="bankAccount" />
							<span>No</span>
						</div>
					</div>
				</FormGroup>
				{
					hasBankAccount && (
						<div className={styles.TimelineTwo_optional}>
							<FormGroup>
								<label>Bank Name *</label>
								<div className={styles.TimelineTwo_BankName}>
									<select
										name="bankName"
										onChange={handleBankInputChange}>
										<option value={"Select bank"}>{"Select bank * "}</option>
										{
											BANKS.map(({ name }, idx) => (<option key={name} value={name}>{name}</option>))
										}
									</select>
								</div>
							</FormGroup>
							<FormGroup>
								<label>Personal Bank Account Number *</label>
								<div className={styles.TimelineTwo_AccountNumber}>
									<input
										onChange={handleBankInputChange}
										value={bankDetails?.accountNumber}
										placeholder="Enter your Personal Bank Account Number"
										name="accountNumber"
										required />
								</div>
							</FormGroup>
						</div>
					)
				}
				<div className={["navigation_btn"]}>
					<button onClick={() => handleNaviIndex(1)} className={["go_back"].join(" ")}>Back</button>
					<button onClick={sendTimelineTwo} className={["forward"].join(" ")}>Continue</button>
				</div>
			</div>
		</SignUpUI>
	)
}

export default TimeLineTwo