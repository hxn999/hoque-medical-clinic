

export function regForm(req, res) {
    res.render("reg-form")
}
export function drugForm(req, res) {
    res.render("drug-form")
}
export function mediForm(req, res) {
    res.render("details-form")
}

export async function regFormHandler(req, res) {

    try {

        console.log(req.body)
        const reg_form = new Registration(
            {
                firstName: req.body.first_name,
                lastName: req.body.last_name,
                email: req.body.email,
                dateOfBirth: req.body.date_of_birth,
                phone: req.body.phone,
                address: req.body.address,
                gender: req.body.biological_sex,
                primaryCareMD: req.body.primary_care_md,
                maritalStatus: req.body.marital_status,
                employer: req.body.employer,
                student: req.body.student,
                emergencyContact: req.body.emergency_contact,
                emergencyPhone: req.body.emergency_contact_phone,
                employmentStatus: req.body.employment_status,
                responsibleParty: {
                    name: req.body.responsible_party,
                    phone: req.body.responsible_party_phone,
                    address: req.body.responsible_party_address,
                    relationship: req.body.responsible_party_relationship
                },
                primaryInsuarance: {
                    carrier: req.body.primary_insurance_carrier,
                    id: req.body.primary_insurance_id,
                    group: req.body.primary_insurance_group,
                    address: req.body.primary_insurance_address,
                    subscriber: req.body.primary_insurance_subscriber,
                    relationship: req.body.primary_relationship,
                    dateOfBirth: req.body.primary_subscriber_dob
                },
                secondaryInsuarance: {
                    carrier: req.body.secondary_insurance_carrier,
                    id: req.body.secondary_insurance_id,
                    group: req.body.secondary_insurance_group,
                    address: req.body.secondary_insurance_address,
                    subscriber: req.body.secondary_insurance_subscriber,
                    relationship: req.body.secondary_relationship,
                    dateOfBirth: req.body.secondary_subscriber_dob
                }


            }
        )

        await reg_form.save()
        res.cookie("_USER", { name: req.body.first_name + " " + req.body.last_name, email: req.body.email, phone: req.body.phone },
            {
                sameSite: 'strict',
                path: '/',
                httpOnly: true,
                maxAge: 86400 * 1000 * 60,
            }
        )
        .render("reg-form",{
            msg:"Form submitted successfully !",
            error:""
        })
    } catch (error) {
        res.render("reg-form",{
            msg:"",
            error:"An error occured ! please try again"
        })
    }
}