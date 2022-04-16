import React from 'react'

export default function Button({text, collapseId}) {
  return (
    <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#expensesCollapse"
            aria-expanded="false" aria-controls="expensesCollapse">
        {text}
     </button>
  )
}
