import React from 'react'

const PersonalizeSetting = () => {
  return (
    <div className="mt-6 space-y-6 animate-fade">
            <h3 className="mb-4">Appearance</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Theme</label>
                <select className="border-input h-9 w-full rounded-md border px-3 py-1">
                  <option>Light</option>
                  <option>Dark</option>
                  <option>System</option>
                </select>
              </div>
            </div>
          </div>
  )
}

export default PersonalizeSetting