import { useTranslation } from 'react-i18next'
import { supportedLngs } from './config'
import Select from 'react-select'

export default function LocaleSwitcher() {
  const { i18n } = useTranslation()
  const options = Object.entries(supportedLngs).map(([code, name]) => ({
    value: code,
    label: name,
  }))
  const defaultOption = options.find((option) => option.value === i18n.language) || options[0]
  const handleChange = (selectedOption: { value: string; label: string } | null) => {
    if (selectedOption) {
      i18n.changeLanguage(selectedOption.value)
    }
  }
  return (
    <div className='flex items-center justify-center'>
      <div className='text-sm sm:text-base'>
        <Select
          onChange={handleChange}
          options={options}
          defaultValue={defaultOption}
          styles={{
            control: (provided) => ({
              ...provided,
              width: 120,
              minWidth: 100,
            }),
          }}
        />
        {/* <select
                    value={i18n.resolvedLanguage}
                    onChange={(e) => i18n.changeLanguage(e.target.value)}
                >
                    {Object.entries(supportedLngs).map(([code, name]) => (
                        <option value={code} key={code}>
                            {name}
                        </option>
                    ))}
                </select> */}
      </div>
    </div>
  )
}
