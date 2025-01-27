import {
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	Grid,
	IconButton,
	makeStyles,
	Paper,
	TextField,
	Typography,
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import MDEditor from '../../MDEditor'

import { defLanguages } from '../../../languages'

const useStyles = makeStyles((theme) => ({
	rootPaper: {
		padding: theme.spacing(2),
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	testCase: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
	},
	saveButton: {
		marginLeft: theme.spacing(2),
	},
	formControl: {
		display: 'flex',
		margin: theme.spacing(3),
	},
}))

const AuthorCodingQuestion = ({
	questionData,
	setQuestionData,
	updateQuestion,
	deleteQuestion,
}: {
	questionData: any
	setQuestionData: any
	updateQuestion: any
	deleteQuestion: any
}) => {
	const classes = useStyles()

	useEffect(() => {
		if (!questionData.statement)
			setQuestionData({
				questionType: 'coding',
				statement: '',
				testCases: [{ input: '', output: '' }],
				languagesAccepted: [{ id: '', name: '' }],
				timeLimit: '',
				memoryLimit: '',
			})
	}, [])

	const [languages, setLanguages] = useState(defLanguages)

	const addTestCase = () => {
		setQuestionData({
			...questionData,
			testCases: [...questionData.testCases, { input: '', output: '' }],
		})
	}

	const updateTestCaseInput = (value: string, key: number) => {
		let tempTestCases = questionData.testCases.slice()

		tempTestCases[key].input = value

		setQuestionData({ ...questionData, testCases: tempTestCases })
	}

	const updateTestCaseOutput = (value: string, key: number) => {
		let tempTestCases = questionData.testCases.slice()

		tempTestCases[key].output = value

		setQuestionData({ ...questionData, testCases: tempTestCases })
	}

	const removeTestCase = (key: number) => {
		let tempTestCases = questionData.testCases.slice()
		tempTestCases.splice(key, 1)
		setQuestionData({ ...questionData, testCases: tempTestCases })
	}

	return (
		<>
			<Paper className={classes.rootPaper} variant='outlined'>
				<Typography variant='h5'>Statement</Typography>
				<MDEditor
					value={questionData.statement}
					onChange={(value: any) =>
						setQuestionData({
							...questionData,
							statement: value,
						})
					}
				/>
			</Paper>
			<Paper className={classes.rootPaper} variant='outlined'>
				<Typography variant='h5'>Test Cases</Typography>

				<Grid container>
					{questionData.testCases &&
						questionData.testCases.map(
							(testCase: any, key: number) => (
								<>
									<Grid
										md={1}
										style={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
										}}>
										<Typography variant='h5'>
											{`${key + 1}`}
										</Typography>
									</Grid>
									<Grid
										item
										xs={12}
										md={5}
										className={classes.testCase}>
										<TextField
											id='test-case-input'
											label='Input'
											multiline
											rows={5}
											variant='outlined'
											fullWidth
											value={testCase.input}
											onChange={(e) =>
												updateTestCaseInput(
													e.target.value,
													key
												)
											}
										/>
									</Grid>
									<Grid
										item
										xs={12}
										md={5}
										className={classes.testCase}>
										<TextField
											id='test-case-output'
											label='Output'
											multiline
											rows={5}
											variant='outlined'
											fullWidth
											value={testCase.output}
											onChange={(e) =>
												updateTestCaseOutput(
													e.target.value,
													key
												)
											}
										/>
									</Grid>
									<Grid
										item
										xs={12}
										md={1}
										container
										alignItems='center'
										justify='center'>
										<IconButton
											aria-label='delete option'
											color='secondary'
											onClick={() => removeTestCase(key)}
											onMouseDown={(event) =>
												event.preventDefault()
											}
											edge='end'>
											<Delete fontSize='large' />
										</IconButton>
									</Grid>
								</>
							)
						)}
				</Grid>
				<div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
					<Button
						variant='outlined'
						color='primary'
						onClick={() => addTestCase()}>
						Add
					</Button>
				</div>
			</Paper>
			<Paper className={classes.rootPaper} variant='outlined'>
				<Typography variant='h5'>Languages</Typography>
				<FormControl
					component='fieldset'
					className={classes.formControl}>
					<FormGroup
						style={{ display: 'flex', flexDirection: 'row' }}>
						{languages.map((lang, key) => (
							<FormControlLabel
								style={{ margin: 0 }}
								control={
									<Checkbox
										style={{ margin: 0 }}
										checked={lang.selected}
										onChange={() => {
											let tempLanguages =
												languages.slice()
											tempLanguages[key].selected =
												!tempLanguages[key].selected
											setLanguages(tempLanguages)
										}}
										name={lang.name}
									/>
								}
								label={lang.name}
							/>
						))}
					</FormGroup>
				</FormControl>
			</Paper>
			<Paper className={classes.rootPaper} variant='outlined'>
				<Typography variant='h5'>Limits</Typography>
				<Grid container spacing={2}>
					<Grid item xs={5}>
						<TextField
							margin='normal'
							variant='outlined'
							label='Time Limit'
							fullWidth
							value={questionData.timeLimit}
							onChange={(e) => {
								setQuestionData({
									...questionData,
									timeLimit: e.target.value,
								})
							}}
						/>
					</Grid>
					<Grid item xs={5}>
						<TextField
							margin='normal'
							variant='outlined'
							label='Memory Limit'
							fullWidth
							value={questionData.memoryLimit}
							onChange={(e) => {
								setQuestionData({
									...questionData,
									memoryLimit: e.target.value,
								})
							}}
						/>
					</Grid>
					<Grid
						item
						xs={2}
						container
						alignItems='center'
						direction='row-reverse'>
						<Grid item className={classes.saveButton}>
							<Button
								variant='outlined'
								color='secondary'
								onClick={() => {
									let tempLanguages = languages.slice()
									let languagesAccepted = []
									tempLanguages.forEach((lang) => {
										if (lang.selected) {
											languagesAccepted.push({
												id: lang.id,
												name: lang.name,
											})
										}
									})

									updateQuestion(languagesAccepted)
								}}>
								Save
							</Button>
						</Grid>
						<Grid item>
							<Button
								variant='contained'
								color='secondary'
								onClick={() => deleteQuestion()}>
								Delete
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</>
	)
}

export default AuthorCodingQuestion
