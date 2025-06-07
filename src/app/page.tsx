"use client";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import NewCourses from "../components/NewCourses";
import { courseService, Course } from "../services/courseService";

export default function Home() {
	const [userCourses, setUserCourses] = useState<Course[]>([]);
	const [newCourses, setNewCourses] = useState<Course[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchCourses() {
			setIsLoading(true);
			const all = await courseService.listCourses();
			setUserCourses(ll.filter((c: Course) => c.enrolled));
			setNewCourses(all.filter((c: Course) => !c.enrolled));
			setIsLoading(false);
		}
		fetchCourses();
	}, []);

	async function onEnroll(courseId: string) {
		setIsLoading(true);
		await courseService.enroll(courseId);
		const all = await courseService.listCourses();
		setUserCourses(all.filter((c: Course) => c.enrolled));
		setNewCourses(all.filter((c: Course) => !c.enrolled));
		setIsLoading(false);
	}

	async function onUnenroll(courseId: string) {
		setIsLoading(true);
		await courseService.unenroll(courseId);
		const all = await courseService.listCourses();
		setUserCourses(all.filter((c: Course) => c.enrolled));
		setNewCourses(all.filter((c: Course) => !c.enrolled));
		setIsLoading(false);
	}

	return (
		<div className="min-h-screen flex bg-[#eae5e0]">
			<Sidebar />
			<div className="flex-1 flex flex-col">
				<Header userName="Paula" />
				<main className="flex-1 p-8 bg-white rounded-xl shadow-sm mt-6">
					{isLoading ? (
						<div>Carregando...</div>
					) : (
						<>
							<Carousel title="Seus cursos" courses={userCourses} onUnenroll={onUnenroll} />
							<NewCourses courses={newCourses} onEnroll={onEnroll} />
						</>
					)}
				</main>
			</div>
		</div>
	);
}
