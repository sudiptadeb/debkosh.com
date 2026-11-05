#!/bin/sh
# Adds Sudipta Deb's personal SSH public key to this user's authorized_keys.
#   curl -fsSL https://debkosh.com/ssh.sh | sh
# Safe to run again: the key is added only if it is missing.
# Touches nothing else: no sshd_config edits, password login is left as it is.
set -eu

URL="https://debkosh.com/ssh.pub"

if command -v curl >/dev/null 2>&1; then
  KEY=$(curl -fsSL "$URL")
elif command -v wget >/dev/null 2>&1; then
  KEY=$(wget -qO- "$URL")
else
  echo "ssh.sh: need curl or wget" >&2; exit 1
fi

case "$KEY" in
  ssh-ed25519\ *) ;;
  *) echo "ssh.sh: $URL did not return an ssh-ed25519 key, nothing changed" >&2; exit 1 ;;
esac

DIR="$HOME/.ssh"
FILE="$DIR/authorized_keys"
umask 077
mkdir -p "$DIR"
chmod 700 "$DIR"
touch "$FILE"
chmod 600 "$FILE"

# Match on type + key body, ignoring the comment.
BODY=$(printf '%s\n' "$KEY" | awk '{print $1" "$2}')
if grep -qF "$BODY" "$FILE"; then
  echo "Key already in $FILE, nothing to do."
  exit 0
fi

# Keep the last existing line intact if the file lacks a final newline.
if [ -s "$FILE" ] && [ "$(tail -c 1 "$FILE")" != "" ]; then
  echo >> "$FILE"
fi
printf '%s\n' "$KEY" >> "$FILE"
echo "Added key to $FILE"
