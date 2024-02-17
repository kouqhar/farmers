import { useState } from "react"
import { Link } from "react-router-dom"
import FormGroup from "../../UI/FormGroup"
import SignUpUI from "./SignUpUI"
import { AccountThreeImage, FingerPrint, InvalidAlertImage } from "../../assets/images"

// Styles
import styles from "./styles/styles.module.css"

const FingerPrints = [
	{
		image: FingerPrint,
		finger: "Left Thumb"
	},
	{
		image: FingerPrint,
		finger: "Left Index"
	},
	{
		image: FingerPrint,
		finger: "Right Thumb"
	},
	{
		image: FingerPrint,
		finger: "Right Index"
	},
]

const TimeLineThree = ({ handleNaviIndex, handleNextNavi }) => {
	const [isSkip, setIsSkip] = useState(false)
	const pageData = {
		image: AccountThreeImage,
		alt: "Security Setup Fingerprint",
		formInfo: "Security - Setup Fingerprint (Optional)"
	}

	const handleOnSkip = e => setIsSkip(prevState => !prevState)

	return (
		<SignUpUI pageData={pageData}>
			<div className={styles.TimelineThree}>
				<p>Capture FingerPrint (Your L-R Index fingers)</p>
				<div className={styles.TimelineThree_fingerprints}>
					{
						FingerPrints.map(({ image, finger }, idx) => (<div key={finger} className={styles.TimelineThree_fingerprints__finger}>
							<img src={image} alt={finger} />
							<p>{finger}</p>
						</div>))
					}
				</div>

				<p className={styles.TimelineThree_info}>
					<img src={InvalidAlertImage} alt="Biometrics attention" />
					<span>Place your finger on the finger print scanner to capture your fingerprint.
						Ensure your finger covers the entire scanner. </span>
				</p>
				<div className={styles.TimelineThree_skip}>
					<p className={styles.TimelineThree_skip__content} onClick={handleOnSkip}>
						<input type="checkbox" onChange={handleOnSkip} checked={isSkip} />
						<span>Skip for now</span> {/* Skip to enable continue btn */}
					</p>
				</div>
			</div>

			<div className={["navigation_btn"]}>
				<button onClick={() => handleNaviIndex(2)} className={["go_back"].join(" ")}>Back</button>
				<button
					onClick={handleNextNavi}
					disabled={!isSkip}
					className={["forward"].join(" ")}>Continue</button>
			</div>
		</SignUpUI>
	)
}

export default TimeLineThree