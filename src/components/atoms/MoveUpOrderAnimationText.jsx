import { motion } from "framer-motion"

const MoveUpOrderAnimationText = ({ className, text, highlightWords, onAnimationComplete }) => {
  const words = text.split(" ") // 단어 단위로 나누기

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6 },
    }),
  }

  return (
    <p className="flex flex-wrap">
      {words.map((word, index) => {
        const isHighlighted = highlightWords[word] // highlightWords 배열에 포함된 단어인지 확인
        const isLastWord = index === words.length - 1 // 마지막 단어인지 확인

        return (
          <motion.span
            key={index}
            className={`${className} ${isHighlighted ? highlightWords[word] : ""} mr-1`}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            onAnimationComplete={isLastWord ? onAnimationComplete : undefined}
          >
            {word}
          </motion.span>
        )
      })}
    </p>
  )
}

export default MoveUpOrderAnimationText
