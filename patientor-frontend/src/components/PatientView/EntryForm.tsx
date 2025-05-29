import {
	Box,
	Button,
	Chip,
	Divider,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextareaAutosize,
	TextField,
	Tooltip,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useContext } from "react";
import DiagnosesContext from "../contexts/DiagnosesContext";
import {
	Entry,
	HealthCheckRating,
	NewEntry,
	OccupationalHealthCareEntryType,
} from "../../types";
import patients from "../../services/patients";
import dayjs from "dayjs";
import {
	Controller,
	FieldErrors,
	SubmitHandler,
	useForm,
} from "react-hook-form";

interface EntryFormProps {
	patientId: string;
	addEntry: (entry: Entry) => void;
}

export const EntryForm = ({ patientId, addEntry }: EntryFormProps) => {
	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<NewEntry>({
		defaultValues: {
			type: "OccupationalHealthCare",
			specialist: "",
			date: dayjs().toString(),
			diagnosisCodes: [],
			description: "",
		},
	});
	const entryType = watch("type");
	const sickLeaveStart = watch("sickLeave.startDate");
	const onSubmit: SubmitHandler<NewEntry> = async (data) => {
		try {
			const addedEntry = await patients.addPatientEntry(patientId, data);
			addEntry(addedEntry);
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
								required: "*Select a type",
							}}
							control={control}
							name="type"
							render={({ field }) => {
								return (
									<FormControl>
										<InputLabel>Entry Type</InputLabel>
										<Select {...field} label="Entry Type">
											<MenuItem value="HealthCheck">Health Check</MenuItem>
											<MenuItem value="Hospital">Hospital</MenuItem>
											<MenuItem value="OccupationalHealthCare">
												Occupational Health Care
											</MenuItem>
										</Select>
									</FormControl>
								);
							}}
						/>
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
						{entryType === "HealthCheck" && (
							<Controller
								defaultValue={0}
								rules={{ required: "*Dont Cheat" }}
								control={control}
								name="healthCheckRating"
								render={({ field }) => {
									return (
										<FormControl>
											<InputLabel id="health-check-rating-label">
												Health Check Rating
											</InputLabel>
											<Select {...field} labelId="health-check-rating-label">
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
						)}
						{entryType === "Hospital" && (
							<>
								<Controller
									defaultValue=""
									control={control}
									name="discharge.criteria"
									render={({ field }) => {
										return <TextField {...field} label="Discharge Criteria" />;
									}}
								/>
								<Controller
									defaultValue={dayjs().toString()}
									control={control}
									name="discharge.date"
									render={({ field }) => {
										return (
											<DatePicker
												label="Discharge Date"
												ref={field.ref}
												name={field.name}
												onChange={(value) => field.onChange(value)}
												value={dayjs(field.value)}
											/>
										);
									}}
								/>
							</>
						)}
						{entryType === "OccupationalHealthCare" && (
							<>
								<Controller
									control={control}
									name="employerName"
									defaultValue=""
									render={({ field }) => {
										return <TextField {...field} label="Employer" />;
									}}
								/>
								<Stack
									direction="row"
									spacing={2}
									divider={<Divider orientation="vertical" flexItem />}
									width="100%"
								>
									<Box flex={1}>
										<Controller
											control={control}
											name="sickLeave.startDate"
											defaultValue={dayjs().toString()}
											render={({ field }) => {
												return (
													<DatePicker
														ref={field.ref}
														label="Start Date"
														name={field.name}
														disabled={field.disabled}
														onChange={(value) => field.onChange(value)}
														value={dayjs(field.value)}
														slotProps={{
															textField: {
																fullWidth: true,
															},
														}}
													/>
												);
											}}
										/>
									</Box>
									<Box flex={1}>
										<Controller
											control={control}
											rules={{
												validate: (value) => {
													const start = dayjs(sickLeaveStart);
													const end = dayjs(value);
													return (
														end.diff(start, "day") > 0 ||
														"*End Date Can't be earlier than startDate"
													);
												},
											}}
											name="sickLeave.endDate"
											defaultValue={dayjs().toString()}
											render={({ field }) => {
												return (
													<DatePicker
														ref={field.ref}
														label="End Date"
														name={field.name}
														disabled={field.disabled}
														onChange={(value) => field.onChange(value)}
														value={dayjs(field.value)}
														slotProps={{
															textField: { fullWidth: true },
														}}
													/>
												);
											}}
										/>
									</Box>
								</Stack>
								<FormHelperText>
									{
										(errors as FieldErrors<OccupationalHealthCareEntryType>)
											.sickLeave?.endDate?.message
									}
								</FormHelperText>
							</>
						)}
						<Button type="submit">Submit</Button>
					</LocalizationProvider>
				</Stack>
			</form>
		</>
	);
};
