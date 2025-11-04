# Chitty tracker nudges and reminders
CHITTY_LAST_CHECKPOINT="${HOME}/.cache/chitty_last_checkpoint"

# Time-based reminder (checks every prompt)
chitty_checkpoint_reminder() {
  local now=$(date +%s)
  local last=0
  [[ -f "$CHITTY_LAST_CHECKPOINT" ]] && last=$(<"$CHITTY_LAST_CHECKPOINT")

  local diff=$(( now - last ))
  local threshold=$(( ${CHITTY_NUDGE_INTERVAL_MINUTES:-45} * 60 ))

  if (( diff > threshold )); then
    print -P "%F{cyan}[chitty]%f It's been $(( diff/60 ))m. Time to update your tracker?"
    echo $now >| "$CHITTY_LAST_CHECKPOINT"
  fi
}

# Add to precmd hooks
if ! (( ${precmd_functions[(I)chitty_checkpoint_reminder]} )); then
  precmd_functions+=( chitty_checkpoint_reminder )
fi

# Nudge after significant git/deploy commands
chitty_after_cmd() {
  local cmd=$1
  case "$cmd" in
    git\ commit*|git\ merge*|git\ tag*|wrangler\ deploy*|npm\ publish*|make\ deploy* )
      print -P "%F{yellow}[chitty]%f Remember to update your tracker"
      command -v chitty >/dev/null && chitty nudge now
      ;;
  esac
}

# Add to preexec hooks
autoload -Uz add-zsh-hook
add-zsh-hook preexec chitty_after_cmd

# Quick checkpoint function
ai_checkpoint() {
  local msg="${*:-Checkpoint}"
  command -v chitty >/dev/null && chitty checkpoint "$msg"
}

# Hotkey to open tracker (Ctrl-G)
function chitty_open_tracker() {
  if command -v chitty >/dev/null; then
    chitty nudge now
  else
    print -P "%F{red}[chitty]%f chitty command not found"
  fi
  zle reset-prompt
}

zle -N chitty_open_tracker
bindkey '^G' chitty_open_tracker
