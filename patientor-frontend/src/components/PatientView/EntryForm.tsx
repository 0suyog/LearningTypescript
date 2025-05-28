import {
	Alert,
	Button,
	Chip,
	createTheme,
	FormControl,
	FormHelperText,
	Input,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
	Stack,
	TextareaAutosize,
	TextField,
	ThemeProvider,
	Tooltip,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormEvent, useContext, useEffect, useState } from "react";
import DiagnosesContext from "../contexts/DiagnosesContext";
import { Diagnosis, HealthCheckRating, NewEntry } from "../../types";
import patients from "../../services/patients";
import dayjs, { Dayjs } from "dayjs";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TextFieldsRounded } from "@mui/icons-material";
import { render } from "react-dom";

// declare module

const theme = createTheme({
	palette: {
		primary: {
			main: "#B6244F",
			light: "#DD557E",
			dark: "#66142D",
			contrastText: "#0E3343",
		},
	},
});

export const EntryForm = () => {
	const [date, setDate] = useState<string>(dayjs().toString());
	const [specialist, setSpecialist] = useState("");
	const diagnosisCodes = useContext(DiagnosesContext);
	const [selectedCodes, setSelectedCodes] = useState<Array<Diagnosis["code"]>>(
		[]
	);
	const [description, setDescription] = useState<string>("");
	const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
		HealthCheckRating.LowRisk
	);
	// error states for each fields
	const [specialistError, setSpecialistError] = useState<string>("");
	const [dateError, setDateError] = useState<string>("");
	const [descriptionError, setDescriptionError] = useState<string>("");
	const [selectedCodesError, setSelectedCodesError] = useState<string>("");
	const [healthCheckRatingError, setHealthCheckRatingError] =
		useState<string>("");

	useEffect(() => {
		if (specialist) {
			setSpecialistError("");
		}
		if (description) {
			setDescriptionError("");
		}
		if (selectedCodes.length) {
			setSelectedCodesError("");
		}
		if (healthCheckRating) {
			setHealthCheckRatingError("");
		}
	}, [specialist, description, selectedCodes.length, healthCheckRating]);

	const handleSubmit1 = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		let notProcessable = false;
		if (!specialist) {
			notProcessable = true;
			setSpecialistError("Specialist Field is required");
		}
		if (!description) {
			notProcessable = true;
			setDescriptionError("Description Field is required");
		}
		if (!selectedCodes.length) {
			notProcessable = true;
			setSelectedCodesError("Diagnoses Codes are required");
		}
		if (!healthCheckRating) {
			notProcessable = true;
			setHealthCheckRatingError("You cheating huh?");
		}
		if (notProcessable) {
			return;
		}
		const entry: NewEntry = {
			specialist,
			diagnosisCodes: selectedCodes,
			description,
			healthCheckRating,
			date,
			type: "HealthCheck",
		};
		const id = "d2773c6e-f723-11e9-8f0b-362b9e155667";
		try {
			await patients.addPatientEntry(id, entry);
			alert("success");
		} catch (error) {
			console.warn(error);
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<form onSubmit={handleSubmit1}>
					<Stack spacing={2}>
						<TextField
							id="specialist"
							value={specialist}
							label="specialist"
							onChange={(e) => setSpecialist(e.target.value)}
						/>
						{specialistError && (
							<Alert severity="error" onClose={() => setSpecialistError("")}>
								{specialistError}
							</Alert>
						)}
						<DatePicker
							label="entry-date"
							value={dayjs(date)}
							onChange={(e) => {
								if (e !== null) {
									const date = e.toString();
									setDate(date);
								}
							}}
						/>
						{dateError && (
							<Alert severity="error" onClose={() => setDateError("")}>
								{dateError}
							</Alert>
						)}
						<FormControl>
							<InputLabel id="entry-diagnosis-codes">
								Diagnoses Codes:
							</InputLabel>
							<Select
								labelId="entry-diagnosis-codes"
								value={selectedCodes}
								multiple
								input={<OutlinedInput label="Diagnoses Codes: " />}
								onChange={(e: SelectChangeEvent<string[]>) => {
									const value = e.target.value;
									if (typeof value === "string") {
										setSelectedCodes(value.split(","));
									} else {
										setSelectedCodes(value);
									}
								}}
								renderValue={(v) => {
									return v.map((value) => {
										return (
											<Chip key={value} variant="outlined" label={value} />
										);
									});
								}}
							>
								{diagnosisCodes.map((code) => {
									return (
										<MenuItem value={code.code} key={code.code}>
											<Tooltip title={code.name} placement="right">
												<span>{code.code}</span>
											</Tooltip>
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
						{selectedCodesError && (
							<Alert severity="error" onClose={() => setSelectedCodesError("")}>
								{selectedCodesError}
							</Alert>
						)}
						<span>Write a Description of your entry: </span>
						<TextareaAutosize
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							minRows={2}
							placeholder="Description"
						/>
						{descriptionError && (
							<Alert severity="error" onClose={() => setDescriptionError("")}>
								{descriptionError}
							</Alert>
						)}
						<FormControl>
							<InputLabel id="entry-health-rating">Health Rating:</InputLabel>
							<Select
								labelId="entry-health-rating"
								value={healthCheckRating}
								input={<OutlinedInput label="Health Rating: " />}
								renderValue={(value) => <span>{value}</span>}
								onChange={(e: SelectChangeEvent<HealthCheckRating>) => {
									setHealthCheckRating(Number(e.target.value));
								}}
							>
								{Object.entries(HealthCheckRating)
									.filter(([_key, val]) => typeof val === "number")
									.map(([key, value]) => {
										return (
											<MenuItem value={value} key={key}>
												<Tooltip title={key}>
													<span>{value}</span>
												</Tooltip>
											</MenuItem>
										);
									})}
							</Select>
						</FormControl>
						{healthCheckRatingError && (
							<Alert
								severity="error"
								onClose={() => setHealthCheckRatingError("")}
							>
								{healthCheckRatingError}
							</Alert>
						)}
					</Stack>
					<Button variant="contained" type="submit">
						Submit
					</Button>
				</form>
			</LocalizationProvider>
		</ThemeProvider>
	);
};

export const EntryHookForm = () => {
	const { register, handleSubmit } = useForm<NewEntry>();
	const diagnosisCodes = useContext(DiagnosesContext);
	const [displayData, setDisplayData] = useState({});
	const onSubmit: SubmitHandler<NewEntry> = (data) => {
		console.log(data);
		setDisplayData(data);
	};
	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{ display: "flex", flexDirection: "column" }}
			>
				<label htmlFor="specialist">Specialist:</label>
				<input {...register("specialist", { required: true })}></input>
				<label htmlFor="entry-date">Date:</label>
				<input type="date" {...register("date", { required: true })}></input>
				<label htmlFor="diaagnosisCodes">Diagnosis Codes:</label>
				<select {...register("diagnosisCodes", { required: true })} multiple>
					{diagnosisCodes.map((code) => (
						<option value={code.code} key={code.code}>
							{code.code}
						</option>
					))}
				</select>
				<label htmlFor="description">Description:</label>
				<textarea {...register("description", { required: true })}></textarea>
				<select {...register("healthCheckRating", { required: true })}>
					{Object.values(HealthCheckRating)
						.filter((v) => typeof v === "number")
						.map((value) => (
							<option value={value} key={value}>
								{value}
							</option>
						))}
				</select>
				<input type="submit" value="submit" />
			</form>
			<ul>
				{Object.entries(displayData).map(([key, value]) => {
					return (
						<li key={key}>
							{key} : {value.toString()}
						</li>
					);
				})}
			</ul>
		</>
	);
};

export const HookWUIform = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<NewEntry>({
		defaultValues: {
			specialist: "",
			date: dayjs().toString(),
			diagnosisCodes: [],
			description: "",
			healthCheckRating: 0,
		},
	});
	const onSubmit: SubmitHandler<NewEntry> = async (data) => {
		const id = "d2773c6e-f723-11e9-8f0b-362b9e155667";
		try {
			await patients.addPatientEntry(id, data);
			alert("success");
		} catch (error) {
			console.warn(error);
		}
	};
	const diagnosisCodes = useContext(DiagnosesContext);

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack gap={2} mt={2}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<Controller
							rules={{
								required: "*Specialist is required.",
							}}
							name="specialist"
							control={control}
							render={({ field }) => {
								return (
									<TextField
										{...field}
										variant="outlined"
										label="Specialist"
										helperText={errors?.specialist?.message}
										FormHelperTextProps={{
											sx: {
												color: "red",
											},
										}}
									/>
								);
							}}
						/>
						<Controller
							name="date"
							control={control}
							rules={{ required: "*Date is required" }}
							render={({ field }) => (
								<DatePicker
									label={"Date"}
									value={dayjs(field.value)}
									onChange={(date) => field.onChange(date)}
									ref={field.ref}
									slotProps={{
										textField: {
											helperText: errors.date?.message,
										},
									}}
								/>
							)}
						/>
						<Controller
							name="diagnosisCodes"
							control={control}
							rules={{ required: "*Select at least one code" }}
							render={({ field }) => {
								return (
									<FormControl>
										<InputLabel>Diagnosis Codes</InputLabel>
										<Select
											{...field}
											multiple
											label="Diagnosis Codes"
											renderValue={(values) => {
												return values.map((value) => {
													return <Chip key={value} label={value} />;
												});
											}}
										>
											{diagnosisCodes.map((code) => (
												<MenuItem key={code.code} value={code.code}>
													<Tooltip title={code.name}>
														<p>{code.code}</p>
													</Tooltip>
												</MenuItem>
											))}
										</Select>
										<FormHelperText sx={{ color: "red" }}>
											{errors.diagnosisCodes?.message}
										</FormHelperText>
									</FormControl>
								);
							}}
						/>
						<Controller
							rules={{ required: "*Give a description aabout this entry" }}
							control={control}
							name="description"
							render={({ field }) => {
								return (
									<TextareaAutosize
										value={field.value}
										onChange={(e) => field.onChange(e.target.value)}
										ref={field.ref}
									/>
								);
							}}
						/>
						<FormHelperText>{errors.description?.message}</FormHelperText>
						<Controller
							rules={{ required: "*Dont Cheat" }}
							control={control}
							name="healthCheckRating"
							render={({ field }) => {
								return (
									<FormControl>
										<InputLabel>Health Check Rating</InputLabel>
										<Select {...field} label="Health Check Rating">
											{Object.entries(HealthCheckRating)
												.filter(([_, value]) => typeof value === "number")
												.map(([key, value]) => (
													<MenuItem key={key} value={value}>
														<Tooltip title={key}>
															<span>{value}</span>
														</Tooltip>
													</MenuItem>
												))}
										</Select>
									</FormControl>
								);
							}}
						/>
						<Button type="submit">Submit</Button>
					</LocalizationProvider>
				</Stack>
			</form>
		</>
	);
};
