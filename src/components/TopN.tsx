import { For } from 'solid-js'

function TopN(props) {
  const users = props.users.sort((a, b) => b.count - a.count) // Sort users by count in descending order
  const maxCount = users[0]?.count
  const minCount = users[users.length - 1]?.count
  const maxAvatarSize = 120
  const minAvatarSize = 60
  const stageSize = props.stageSize
  const scaleSize = (count) => {
    return (
      ((count - minCount) / (maxCount - minCount)) *
        (maxAvatarSize - minAvatarSize) +
      minAvatarSize
    )
  }

  return (
    <div
      class={`relative`}
      style={{ width: `${stageSize}px`, height: `${stageSize}px` }}
    >
      <For each={users}>
        {(user, index) => {
          let size = maxAvatarSize
          let x = stageSize / 2 - maxAvatarSize / 2
          let y = stageSize / 2 - maxAvatarSize / 2
          if (index() !== 0) {
            const angle = ((360 / users.length) * index() * Math.PI) / 180
            size = scaleSize(user.count)
            x = Math.cos(angle) * 200 + 250 - size / 2
            y = Math.sin(angle) * 200 + 250 - size / 2
          }

          return (
            <div
              class="absolute rounded-full overflow-hidden border-[rgba(0,0,0,0.25)] border-2 cursor-pointer"
              title={`You bookmarked ${user.username} ${user.count} times`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${x}px`,
                top: `${y}px`,
              }}
            >
              <img
                src={user.avatar_url.replace('normal', '200x200')}
                class="w-full h-auto block"
              />
            </div>
          )
        }}
      </For>
    </div>
  )
}

export default TopN
