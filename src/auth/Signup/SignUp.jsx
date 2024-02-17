import { useState, useEffect } from 'react'
import TimeLineOne from "./TimeLineOne"
import TimeLineTwo from "./TimeLineTwo"
import TimeLineThree from "./TimeLineThree"
import TimeLineFour from "./TimeLineFour"

// Styles
import styles from "./styles/styles.module.css"


const Signup = () => {
	const [naviIndex, setNaviIndex] = useState(0)
	const handleNaviIndex = (id) => {
		if (id === 0) return
		else setNaviIndex(id - 1)
	}
	const handleNextNavi = () => setNaviIndex(naviIndex + 1)

	const TIMELINES = [
		<TimeLineOne handleNaviIndex={handleNaviIndex} handleNextNavi={handleNextNavi} />,
		<TimeLineTwo handleNaviIndex={handleNaviIndex} handleNextNavi={handleNextNavi} />,
		<TimeLineThree handleNaviIndex={handleNaviIndex} handleNextNavi={handleNextNavi} />,
		<TimeLineFour handleNaviIndex={handleNaviIndex} handleNextNavi={handleNextNavi} />]


	return <>
		{
			TIMELINES[naviIndex]
		}
	</>
}

export default Signup