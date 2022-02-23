#!/usr/bin/zsh

echo "https://www.youtube.com/watch?v=58XCn24uVd4"

while true
do
    echo now: `date +%H:%M:%S`
    terminal-notifier -message "15分が経過しました" -sound Hero
    sleep $((15 * 60))
done
