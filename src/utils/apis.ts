

export const createClients = async(data: any): Promise<any>=>{
    try {
        const client = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/baManager/client`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),

        })
        const response = await client.json();
        return response;
    } catch (error) {
        
    }
}


// ba apis=====================================
export const getBAByName = async (name: string): Promise<any> => {
    // if (process.env.NODE_ENV === 'production') {
    //     // Return mock data for the build process
    //     return { data: { mock: 'This is Mock Data' } };
    // }
    try {
        let ba = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/baManager/businessAssociate/ba/${name}`,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        const res = await ba.json()
        return res?.data;
    } catch (error) {
        console.log(error)
    }
}

// get all ba by baId api=====
export const getAllBa = async (id: string): Promise<any> => {
    // if (process.env.NODE_ENV === 'production') {
    //     // Return mock data for the build process
    //     return { data: { mock: 'This is Mock Data' } };
    // }
    try {
        let ba = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/baManager/businessAssociate/${id}`,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        const res = await ba.json()
        return res?.data;
    } catch (error) {
        console.log(error)
    }
}


export const createBA = async (baData: any): Promise<any> => {
    try {
        let ba = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/baManager/businessAssociate`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(baData),
        })
        const res = await ba.json()
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const GetAllCBList = async(): Promise<any>=>{
    // if (process.env.NODE_ENV === 'production') {
    //     // Return mock data for the build process
    //     return { data: { mock: 'This is Mock Data' } };
    // }
    try {
        let res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/admin/cb`,{
            method: 'GET',
            cache: 'no-cache',
            next:{
                tags:['getAllCbList']
            }
        })
        let data = await res.json();
        return data?.CbList
    } catch (error) {
        console.log(error) 
    }
}

export const getCbByName = async(name: string): Promise<any> => {
    // if (process.env.NODE_ENV === 'production') {
    //     // Return mock data for the build process
    //     return { data: { mock: 'This is Mock Data' } };
    // }
    try {
        let res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/admin/cb/${name}`,{
            method: 'GET',
            cache: 'no-cache',
            next:{
                tags:['getCbByName']
            }
        })
        let data = await res.json();
        console.log("data===>>>>",data)
        return data?.data
    } catch (error) {
        console.log(error) 
    }
}

//  create reate apis===================
export const CreateRateCard = async (RateCards: any) => {
    console.log("RateCards",RateCards) 
    try {
        let rateCard = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/baManager/rate-card`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(RateCards),
        })
        const res = await rateCard.json();
        return res;
    }catch(error) {
        console.log(error)  
    }
}

export const createNewUser = async (payload: any) => {
    console.log("payload",payload) 
    try {
        let user = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/admin/role`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
        const res = await user.json();
        return res;
    }catch(error) {
        console.log(error)  
    }
}




// Admin apis started from here=====================================================================

export const updateRoleById = async(id: string , payload: any): Promise<any> => {
    try {
        let res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/admin/role/${id}`,{
            method: 'PUT',
            body: JSON.stringify(payload)
        })
        let data = await res.json();
        return data
    } catch (error) {
        console.log(error) 
    }

    
}

export const DeleteUser = async (id: any) => {
    console.log("id====",id)
    try {
        let user = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/admin/role/${id}`,{
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        const res = await user.json();
        return res;
    }catch(error) {
        console.log(error)  
    }
}

export const updateStandard = async(name: string , payload: any): Promise<any> => {
    try {
        let res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/admin/cb/${name}`,{
            method: 'PUT',
            body: JSON.stringify(payload)
        })
        let data = await res.json();
        return data
    } catch (error) {
        console.log(error) 
    } 
}

export const updateCountry = async(name: string , payload: any): Promise<any> => {
    try {
        let res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/admin/cb/${name}`,{
            method: 'PUT',
            body: JSON.stringify(payload)
        })
        let data = await res.json();
        return data
    } catch (error) {
        console.log(error) 
    }    
}

export const deleteStandardApi = async(name: string , payload: any): Promise<any> =>{
    try {
        let res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/admin/cb/${name}`,{
            method: 'DELETE',
            body: JSON.stringify(payload)
        })
        let data = await res.json();
        return data
    } catch (error) {
        console.log(error) 
    }
}

export const deleteCountryApi = async(name: string , payload: any): Promise<any> =>{
    try {
        let res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/admin/cb/${name}`,{
            method: 'DELETE',
            body: JSON.stringify(payload)
        })
        let data = await res.json();
        return data
    } catch (error) {
        console.log(error) 
    }
}

export const createStandardOrCountry = async(name: string , payload: any): Promise<any> => {
    try {
        let res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/admin/cb/${name}`,{
            method: 'POST',
            body: JSON.stringify(payload)
        })
        let data = await res.json();
        return data
    } catch (error) {
        console.log(error)
    }
}








// scope manager apis================================================================================


export const createScope = async(payload: any): Promise<any> => {
    try {
        let res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/scopeManager`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        let data = await res.json();
        return data
    } catch (error) {
        console.log(error)
    }
}


// approve scope with id
export const approvedScopeById = async(id: string , payload:any): Promise<any> => {
    try {
        let res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/baManager/scope/${id}`,{
            method: 'POST',
            cache:'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        let data = await res.json();
        return data
    } catch (error) {
        console.log(error)
    }
}


export const approveScopeByQualityManager = async(id: string , payload: any): Promise<any> => {
    try {
        let res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/qualityManager/${id}`,{
            method: 'POST',
            cache:'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        let data = await res.json();
        return data
    } catch (error) {
        console.log(error)
    }
}




// certificate generate api==============================================================================


export const generateCertificate = async(payload: any): Promise<any> => {
    try {
        let res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/GenerateCertificate`,{
            method: 'POST',
            cache:'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        let data = await res.json();
        return data
    } catch (error) {
        console.log(error)
    }
}
