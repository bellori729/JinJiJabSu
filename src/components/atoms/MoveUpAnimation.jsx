import { motion } from "framer-motion"

const MoveUpAnimation = ({
  className,
  children,
  durationTime = 0.8,
  delayTime = 0,
  amountRatio = 0.5,
  onAnimationComplete,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }} // 처음에는 투명하고 아래쪽에 위치
      // animate={{ opacity: 1, y: 0 }} // 점점 나타나면서 원래 위치로 이동
      whileInView={{ opacity: 1, y: 0 }} // 화면에 보이면 나타나면서 원래 위치로 이동
      viewport={{ once: true, amount: amountRatio }} // 한 번만 애니메이션 (화면에 30% 들어오면 애니메이션)
      transition={{ duration: durationTime, delay: delayTime, ease: "easeOut" }} // 부드러운 애니메이션
      onAnimationComplete={onAnimationComplete}
    >
      {children}
    </motion.div>
  )
}

export default MoveUpAnimation
