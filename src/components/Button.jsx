import React from "react"
import classNames from 'class-names'

const shared =
  "rounded-full transition-color duration-150 w-fit px-3 whitespace-nowrap"

const large = "text-base h-11 font-semibold"
const medium = "text-sm h-11 font-semibold "
const small = "text-[13px] h-9 font-medium"

const solid = "text-white bg-brand-blue-azureRadiance"
const ghost =
  "text-brand-blue-azureRadiance bg-white border-brand-blue-azureRadiance border"

const transparent = "text-brand-blue-azureRadiance font-semibold"

const getSizeClass = size => {
  if (size === "large") return large
  if (size === "medium") return medium
  if (size === "small") return small
}

const getVariantClass = variant => {
  if (variant === "solid") return solid
  if (variant === "ghost") return ghost
  if (variant === "transparent") return transparent
}

const Button = ({
  text,
  size = "medium",
  variant = "solid",
  addclassname = "",
  icon,
  isLink,
  isLoading = false,
  disabled,
  ...rest
}) => {
  const mergedClassNames = classNames(
    isLoading
      ? "cursor-wait"
      : disabled
      ? "opacity-50 cursor-not-allowed "
      : "ripple",
    variant === "transparent"
      ? classNames(getVariantClass(variant))
      : classNames(shared, getSizeClass(size), getVariantClass(variant)),
    addclassname,
    "flex items-center justify-center"
  )

  return (
    <button className={mergedClassNames} {...rest}>
      {icon ? icon : ""}
      {isLoading && (
        <div className=" w-7 h-7 border-white border-t-[#cccccc66] loader animate-spin rounded-full border-t-[2px] border-[2px]" />
      )}
      {text}
    </button>
  )
}

export default Button
