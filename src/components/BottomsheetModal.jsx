import classNames from "class-names";
import PropTypes from 'prop-types';

const BottomsheetModal = ({
  onClose,
  showCross,
  children,
  addclassname,
  addCloseIconClass,
}) => {
  return (
    <>
      <div
        onClick={onClose}
        className="fixed w-100vw h-100vh top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-10 overflow-hidden"
      />
      <div
        className={classNames(
          "fixed bottom-0 z-20 bg-white w-full rounded-t-2xl p-6 max-h-[70%] overflow-scroll pt-0 animate-ModalB2T",
          addclassname
        )}
      >
        {showCross && (
          <div
            className={classNames(
              "text-right text-34px sticky top-2 right-5",
              addCloseIconClass
            )}
            onClick={onClose}
          >
            ×
          </div>
        )}
        {children}
      </div>
    </>
  );
};

BottomsheetModal.propTypes = {
onClose: PropTypes.func,
showCross: PropTypes.bool,
addclassname: PropTypes.string,
addCloseIconClass: PropTypes.string
}

export default BottomsheetModal;
