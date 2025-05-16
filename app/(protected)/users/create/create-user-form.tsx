'use client'

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {z} from "zod";
import {UserRoles} from "@/constants/enums";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {fileUploadOnChangeHandler} from "@/lib/utils";
import {Button} from "@/components/ui/button";

export default function CreateUserForm() {

    const formSchema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        phone: z.string().min(1, "Phone number is required"),
        emiratesId: z.string().min(1, "Emirates ID is required"),
        profileImage: z
            .any()
            .refine((files) => files instanceof FileList && files.length === 1, {
                message: "Please upload exactly one file.",
            })
            .refine((files) => {
                const file = files?.[0];
                return file && ["image/png", "image/jpeg"].includes(file.type);
            }, {
                message: "Only PNG and JPEG files are allowed.",
            }),
        passport:z.any()
            .refine((files) => files instanceof FileList && files.length === 1, {
                message: "Please upload exactly one file.",
            })
            .refine((files) => {
                const file = files?.[0];
                return file && ["application/pdf"].includes(file.type);
            }, {
                message: "Only PDF file is allowed.",
            }),
        emiratesIdDoc:z.any()
            .refine((files) => files instanceof FileList && files.length === 1, {
                message: "Please upload exactly one file.",
            })
            .refine((files) => {
                const file = files?.[0];
                return file && ["application/pdf"].includes(file.type);
            }, {
                message: "Only PDF file is allowed.",
            }),
        insurance:z.any()
            .refine((files) => files instanceof FileList && files.length === 1, {
                message: "Please upload exactly one file.",
            })
            .refine((files) => {
                const file = files?.[0];
                return file && ["application/pdf"].includes(file.type);
            }, {
                message: "Only PDF file is allowed.",
            }),
        contract:z.any()
            .refine((files) => files instanceof FileList && files.length === 1, {
                message: "Please upload exactly one file.",
            })
            .refine((files) => {
                const file = files?.[0];
                return file && ["application/pdf"].includes(file.type);
            }, {
                message: "Only PDF file is allowed.",
            }),
        offerLetter:z.any()
            .refine((files) => files instanceof FileList && files.length === 1, {
                message: "Please upload exactly one file.",
            })
            .refine((files) => {
                const file = files?.[0];
                return file && ["application/pdf"].includes(file.type);
            }, {
                message: "Only PDF file is allowed.",
            }),
        simCardResponsibility:z.any()
            .refine((files) => files instanceof FileList && files.length === 1, {
                message: "Please upload exactly one file.",
            })
            .refine((files) => {
                const file = files?.[0];
                return file && ["application/pdf"].includes(file.type);
            }, {
                message: "Only PDF file is allowed.",
            }),
        drivingLicense:z.any()
            .refine((files) => files instanceof FileList && files.length === 1, {
                message: "Please upload exactly one file.",
            })
            .refine((files) => {
                const file = files?.[0];
                return file && ["application/pdf"].includes(file.type);
            }, {
                message: "Only PDF file is allowed.",
            }).optional(),
        userType:z.nativeEnum(UserRoles)
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            emiratesId: "",
            userType: UserRoles.AGENT,
            profileImage: undefined,
            passport: undefined,
            emiratesIdDoc: undefined,
            insurance: undefined,
            contract: undefined,
            offerLetter: undefined,
            simCardResponsibility: undefined,
            drivingLicense: undefined,
        }
    })

    const onSubmitHandler = (values:z.infer<typeof formSchema>)=>{
        console.log(values)
    }
    return(
        <Form {...form} >
            <form className=" py-6 space-y-12 w-full " onSubmit={form.handleSubmit(onSubmitHandler)}>
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Get To Know</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-30 gap-y-6">
                        <FormField
                            control={form.control}
                            name="userType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>User Type</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select user type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={UserRoles.ADMIN}>Admin</SelectItem>
                                                <SelectItem value={UserRoles.AGENT}>Agent</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="johndoe@xyz.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="+9715XXXXXXXX"
                                            {...field}
                                            onChange={(e) => {
                                                let value = e.target.value.replace(/\D/g, "");
                                                if (value.startsWith("971")) value = value.slice(3);
                                                if (value.length > 9) value = value.slice(0, 9);
                                                field.onChange(`+971${value}`);
                                            }}
                                            value={
                                                field.value?.startsWith("+971")
                                                    ? field.value
                                                    : `+971${field.value || ""}`
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="emiratesId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Emirates ID</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="7xx-1xx9-x4xx86x-4"
                                            {...field}
                                            onChange={(e) => {
                                                let value = e.target.value.replace(/\D/g, "");
                                                if (value.length > 15) value = value.slice(0, 15);
                                                const parts = [
                                                    value.slice(0, 3),
                                                    value.slice(3, 7),
                                                    value.slice(7, 14),
                                                    value.slice(14, 15),
                                                ].filter(Boolean);
                                                field.onChange(parts.join("-"));
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="profileImage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Profile Picture</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            onChange={fileUploadOnChangeHandler({
                                                form,
                                                key: "profileImage",
                                                allowedFileTypes: ["image/png", "image/jpeg"],
                                                maxFiles: 1,
                                                field,
                                            })}
                                        />
                                    </FormControl>
                                    {field.value?.[0] && (
                                        <p className="text-sm text-muted-foreground mt-2">
                                            Selected file: <strong>{field.value[0].name}</strong>
                                        </p>
                                    )}

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Section: Upload Zone */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Upload Zone</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-30 gap-y-6">
                        {[
                            ["passport", "Passport"],
                            ["emiratesIdDoc", "Emirates ID Document"],
                            ["insurance", "Insurance"],
                            ["contract", "Contract"],
                            ["offerLetter", "Offer Letter"],
                            ["simCardResponsibility", "SIM Card Responsibility"],
                            ["drivingLicense", "Driving License (Optional)"],
                        ].map(([name, label]) => (
                            <FormField
                                key={name}
                                control={form.control}
                                name={name as keyof z.infer<typeof formSchema>}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{label}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="application/pdf"
                                                onChange={fileUploadOnChangeHandler({
                                                    form,
                                                    key: name as keyof z.infer<typeof formSchema>,
                                                    allowedFileTypes: ["application/pdf"],
                                                    maxFiles: 1,
                                                    field,
                                                })}
                                            />
                                        </FormControl>
                                        {field.value?.[0] && (
                                            <p className="text-sm text-muted-foreground mt-2">
                                                Selected file: <strong>{field.value[0].name}</strong>
                                            </p>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>
                </div>
                <Button type='submit' className="bg-accent-foreground">
                    Submit
                </Button>
            </form>
        </Form>
    );
}