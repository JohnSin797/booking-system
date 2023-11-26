'use client'

export default function DateTimeFrame ({ dateStr })
{
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    }
    const formattedDateTime = new Date(dateStr).toLocaleString('en-US', options)

    return (
        <span>{formattedDateTime}</span>
    )
}