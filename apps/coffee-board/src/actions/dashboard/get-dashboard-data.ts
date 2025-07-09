"use server"

import { initialDashboardData } from "@/constants/dashboard-defaults"
import { DashboardData } from "@/entities/dashboard.entity"
import { pgQuery } from "@/lib/pg"
import { getTokenData } from "../get-token-data"

const query = `
    with recent_projects as (
        select
            coalesce(json_agg(p.recent_project), '[]') recent_projects
        from (
            select 
                row_to_json(p.*) recent_project
            from v_cf_projects_base p
            where id_user = $1
            order by created_at desc
            limit 3
        ) p
    ), recent_tasks as (
        select
            coalesce(json_agg(t.tasks), '[]') recent_tasks
        from (
            select row_to_json(t.*) tasks from v_cf_tasks t
            where id_assigned = $1
            order by created_at desc
            limit 30
        ) t
    ), recent_activity as (
        select 
            coalesce(json_agg(t.history), '[]') recent_activity
        from (
            select
                row_to_json(th.*) history
            from task_history th 
            where th.id_user = $1
            order by id desc
            limit 30
        ) t
    )
    select
        *
    from recent_projects, recent_tasks, recent_activity
`

export default async function getDashboardData(): Promise<DashboardData> {
	try {
		const token = await getTokenData()
		const data = (await pgQuery(query, [token?.id ?? 0]))?.[0]

		if (!data) return initialDashboardData

		return data as DashboardData
	} catch (error) {
		console.error(error)
		return initialDashboardData
	}
}
