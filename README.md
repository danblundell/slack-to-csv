# Convert Slack export files to CSV files

Because some people need that kind of thing.

Turns out the data export from slack gives you JSON files, which is fine if you're that way inclined.

We needed a list of users to import into mailing list software and of course, that expected a CSV.

## To convert some data
1. Do an export from your Slack workspace
1. Download the zip file
1. Drop the contents of the zip file in `slackDataHere` directory
1. To convert users, run `npm run users`
1. The resulting .csv file should appear in `slackCSVHere`