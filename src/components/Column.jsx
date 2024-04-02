import PropTypes from 'prop-types'

export default function Column({ children }) {
    return (
           <div className="cursor-default m-3 text-xl font-medium rounded bg-transparent flex flex-col gap-y-3">
                {children}
           </div> 
    )
}

Column.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.array
    ])
}