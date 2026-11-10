import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiCheck, FiEdit2, FiPlay, FiSearch, FiStar, FiTrash2, FiX } from "react-icons/fi";
import { Styled } from "./styled";

const FALLBACK_POSTER = `${import.meta.env.BASE_URL}noPoster.png`;
const STORAGE_KEY = "movie-watchlist.v1";
const STATUSES = ["To Watch", "Watching", "Watched"];
const RATINGS = [0, 1, 2, 3, 4, 5];
const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
const clamp = (number, min, max) => Math.max(min, Math.min(max, number));
const isMovie = (movie) =>
    movie &&
    typeof movie.id === "string" &&
    typeof movie.title === "string" &&
    typeof movie.year === "string" &&
    STATUSES.includes(movie.status) &&
    Number.isFinite(movie.rating) &&
    movie.rating >= 0 &&
    movie.rating <= 5 &&
    typeof movie.posterUrl === "string" &&
    typeof movie.notes === "string" &&
    Number.isFinite(movie.createdAt);

const readMovies = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === null) return { movies: [], canWrite: true, message: "" };
        const parsed = JSON.parse(stored);
        const uniqueIds = Array.isArray(parsed) && new Set(parsed.map((movie) => movie?.id)).size === parsed.length;
        if (!Array.isArray(parsed) || !parsed.every(isMovie) || !uniqueIds) {
            return { movies: [], canWrite: false, message: "Saved movie data could not be read. Its original value was left untouched; changes in this session will not be saved." };
        }
        return { movies: parsed, canWrite: true, message: "" };
    } catch {
        return { movies: [], canWrite: false, message: "Browser storage is unavailable. Changes in this session will not be saved." };
    }
};

function RatingStars({ value = 0, onChange, titlePrefix = "Rating" }) {
    const set = (next) => typeof onChange === "function" && onChange(clamp(next, 0, 5));
    const starRefs = useRef([]);
    const onKey = (event) => {
        const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
        if (!direction) return;
        event.preventDefault();
        const next = clamp(value + direction, 1, 5);
        set(next);
        starRefs.current[next - 1]?.focus();
    };
    return <Styled.RatingControl>
        <Styled.RatingGroup role="radiogroup" aria-label={`${titlePrefix}: ${value} of 5 stars`} onKeyDown={onKey}>
            {[1, 2, 3, 4, 5].map((star) => <Styled.StarButton ref={(element) => { starRefs.current[star - 1] = element; }} key={star} type="button" role="radio" tabIndex={value === star || (value === 0 && star === 1) ? 0 : -1} aria-checked={value === star} aria-label={`${titlePrefix}: ${star} stars`} title={`${titlePrefix}: ${star}`} onClick={() => set(star)} $filled={value >= star}><FiStar aria-hidden="true" /></Styled.StarButton>)}
        </Styled.RatingGroup>
        <Styled.IconButton type="button" title="Clear rating" aria-label={`Clear ${titlePrefix.toLowerCase()}`} onClick={() => set(0)}><FiX aria-hidden="true" /></Styled.IconButton>
    </Styled.RatingControl>;
}

export default function MovieWatchlist() {
    const [initialData] = useState(readMovies);
    const [movies, setMovies] = useState(initialData.movies);
    const [canWriteStorage, setCanWriteStorage] = useState(initialData.canWrite);
    const [storageMessage, setStorageMessage] = useState(initialData.message);
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [status, setStatus] = useState("To Watch");
    const [rating, setRating] = useState(0);
    const [posterUrl, setPosterUrl] = useState("");
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("All");
    const [sortBy, setSortBy] = useState("created");
    const [editing, setEditing] = useState(null);
    const [confirm, setConfirm] = useState(null);
    const modalRef = useRef(null);
    const cancelButtonRef = useRef(null);
    const confirmButtonRef = useRef(null);
    const askConfirm = (options) => setConfirm({ title: "Are you sure?", message: "", confirmText: "Confirm", cancelText: "Cancel", tone: "default", hideCancel: false, ...options });
    const handleConfirm = () => { const action = confirm?.onConfirm; setConfirm(null); if (typeof action === "function") action(); };

    useEffect(() => {
        if (!confirm) return undefined;
        const previousFocus = document.activeElement;
        const appRoot = document.getElementById("root");
        const previousAriaHidden = appRoot?.getAttribute("aria-hidden");
        const previousInert = appRoot?.hasAttribute("inert") ?? false;
        const previousBodyOverflow = document.body.style.overflow;
        if (appRoot) {
            appRoot.setAttribute("inert", "");
            appRoot.setAttribute("aria-hidden", "true");
        }
        document.body.style.overflow = "hidden";
        (confirm.hideCancel ? confirmButtonRef : cancelButtonRef).current?.focus();

        const onKey = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                setConfirm(null);
                return;
            }
            if (event.key !== "Tab") return;
            const dialog = modalRef.current;
            const focusable = Array.from(dialog?.querySelectorAll("button:not(:disabled)") ?? []).filter((item) => item.getClientRects().length > 0);
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (!first || !last) {
                event.preventDefault();
                dialog?.focus();
            } else if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
                event.preventDefault();
                first.focus();
            }
        };
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = previousBodyOverflow;
            if (appRoot) {
                if (!previousInert) appRoot.removeAttribute("inert");
                if (previousAriaHidden === null) appRoot.removeAttribute("aria-hidden");
                else appRoot.setAttribute("aria-hidden", previousAriaHidden);
            }
            if (previousFocus?.isConnected) previousFocus.focus?.();
            else document.getElementById("watchlist-heading")?.focus();
        };
    }, [confirm]);

    useEffect(() => {
        if (!canWriteStorage) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
        } catch {
            setCanWriteStorage(false);
            setStorageMessage("This browser could not save your movie list. Changes in this session will not be saved.");
        }
    }, [canWriteStorage, movies]);

    const counts = useMemo(() => ({ toWatch: movies.filter((movie) => movie.status === "To Watch").length, watching: movies.filter((movie) => movie.status === "Watching").length, watched: movies.filter((movie) => movie.status === "Watched").length }), [movies]);
    const filtered = useMemo(() => {
        let list = filter === "All" ? movies : movies.filter((movie) => movie.status === filter);
        if (query.trim()) { const search = query.trim().toLowerCase(); list = list.filter((movie) => movie.title.toLowerCase().includes(search) || String(movie.year || "").includes(search)); }
        if (sortBy === "title") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
        else if (sortBy === "year") list = [...list].sort((a, b) => (b.year || 0) - (a.year || 0));
        else if (sortBy === "rating") list = [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0));
        else if (sortBy === "status") { const order = { "To Watch": 0, Watching: 1, Watched: 2 }; list = [...list].sort((a, b) => order[a.status] - order[b.status] || a.title.localeCompare(b.title)); }
        else list = [...list].sort((a, b) => b.createdAt - a.createdAt);
        return list;
    }, [movies, filter, query, sortBy]);

    const addMovie = (event) => { event.preventDefault(); const cleanTitle = title.trim(); if (!cleanTitle) return; const now = Date.now(); setMovies((previous) => [{ id: uid(), title: cleanTitle, year: year.trim(), status, rating: Number(rating) || 0, posterUrl: posterUrl.trim(), notes: "", createdAt: now, updatedAt: now }, ...previous]); setTitle(""); setYear(""); setStatus("To Watch"); setRating(0); setPosterUrl(""); setConfirm({ title: "Saved", message: `Added "${cleanTitle}".`, confirmText: "OK", hideCancel: true }); };
    const saveEdit = (id, patch) => { setMovies((previous) => previous.map((movie) => movie.id === id ? { ...movie, ...patch, updatedAt: Date.now() } : movie)); setEditing(null); setConfirm({ title: "Saved", message: "Movie updated.", confirmText: "OK", hideCancel: true }); };
    const removeMovie = (id) => askConfirm({ title: "Delete movie?", message: "This will remove it from your list.", confirmText: "Delete", tone: "danger", onConfirm: () => setMovies((previous) => previous.filter((movie) => movie.id !== id)) });
    const clearWatched = () => askConfirm({ title: "Clear all \"Watched\" movies?", message: "This will remove all movies marked as Watched.", confirmText: "Clear", tone: "danger", onConfirm: () => setMovies((previous) => previous.filter((movie) => movie.status !== "Watched")) });
    const setStatusQuick = (id, nextStatus) => setMovies((previous) => previous.map((movie) => movie.id === id ? { ...movie, status: nextStatus, updatedAt: Date.now() } : movie));
    const setRatingQuick = (id, nextRating) => setMovies((previous) => previous.map((movie) => movie.id === id ? { ...movie, rating: clamp(Number(nextRating) || 0, 0, 5), updatedAt: Date.now() } : movie));

    return <Styled.Page style={{ backgroundImage: `linear-gradient(145deg, rgba(7, 17, 31, 0.96), rgba(7, 17, 31, 0.9)), url(${import.meta.env.BASE_URL}watchlist-backdrop.jpg)` }}>
        <Styled.Container>
            <Styled.Header><div><Styled.Kicker>YOUR PERSONAL COLLECTION</Styled.Kicker><Styled.Title id="watchlist-heading" tabIndex={-1}>Movie Watchlist</Styled.Title><Styled.Sub>Save movies, track progress and rate them with LocalStorage.</Styled.Sub></div><Styled.BadgeRow><Styled.Tag>To Watch: {counts.toWatch}</Styled.Tag><Styled.Tag>Watching: {counts.watching}</Styled.Tag><Styled.Tag>Watched: {counts.watched}</Styled.Tag></Styled.BadgeRow></Styled.Header>
            <Styled.Card as="form" onSubmit={addMovie}><Styled.FormRow><Styled.Input aria-label="Movie title" placeholder="Movie title *" value={title} onChange={(event) => setTitle(event.target.value)} required /><Styled.Input aria-label="Year" placeholder="Year (for example, 2024)" inputMode="numeric" pattern="\\d{4}" value={year} onChange={(event) => setYear(event.target.value)} /><Styled.Select aria-label="Status" value={status} onChange={(event) => setStatus(event.target.value)}>{STATUSES.map((value) => <option key={value} value={value}>{value}</option>)}</Styled.Select><Styled.Select value={rating} onChange={(event) => setRating(Number(event.target.value))} aria-label="Initial rating">{RATINGS.map((value) => <option key={value} value={value}>{value === 0 ? "No rating" : `${value} stars`}</option>)}</Styled.Select><Styled.Input type="url" aria-label="Poster URL" placeholder="Poster URL (optional)" value={posterUrl} onChange={(event) => setPosterUrl(event.target.value)} /><Styled.PrimaryButton type="submit" disabled={!title.trim()}>Add movie</Styled.PrimaryButton></Styled.FormRow>{!title.trim() && <Styled.Helper>Title is required to add a movie.</Styled.Helper>}<Styled.Helper>Poster URLs are optional. The local fallback keeps missing images readable.</Styled.Helper></Styled.Card>
            <Styled.Toolbar><Styled.RowWrap><Styled.Select value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Filter movies">{["All", ...STATUSES].map((value) => <option key={value} value={value}>{value}</option>)}</Styled.Select><Styled.Select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort movies"><option value="created">Newest</option><option value="title">Title A-Z</option><option value="year">Year, new to old</option><option value="rating">Rating, high to low</option><option value="status">By status</option></Styled.Select><Styled.SearchInput><FiSearch aria-hidden="true" /><input type="search" placeholder="Search title or year" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search title or year" /></Styled.SearchInput></Styled.RowWrap><Styled.RowWrap><Styled.DangerButton type="button" onClick={clearWatched}>Clear "Watched"</Styled.DangerButton></Styled.RowWrap></Styled.Toolbar>
            <Styled.List>{filtered.length === 0 && <Styled.Empty>{movies.length === 0 ? "No movies yet. Add your first one." : "No movies match. Change the search or filters."}</Styled.Empty>}{filtered.map((movie) => editing === movie.id ? <EditRow key={movie.id} movie={movie} onCancel={() => setEditing(null)} onSave={saveEdit} /> : <Styled.Item key={movie.id}><Styled.ThumbWrap><img src={(movie.posterUrl && movie.posterUrl.trim()) || FALLBACK_POSTER} onError={(event) => { if (!event.currentTarget.dataset.fallback) { event.currentTarget.dataset.fallback = "1"; event.currentTarget.src = FALLBACK_POSTER; } }} alt={`${movie.title} poster`} width="64" height="88" /></Styled.ThumbWrap><Styled.ItemLeft><div><Styled.ItemTitle>{movie.title} {movie.year ? <span>({movie.year})</span> : null}</Styled.ItemTitle><Styled.ItemMeta><Styled.Tag>#{movie.status}</Styled.Tag><span aria-hidden="true">•</span>{movie.rating > 0 ? <Styled.Tag>{movie.rating} stars</Styled.Tag> : <Styled.Tag tone="muted">No rating</Styled.Tag>}</Styled.ItemMeta></div></Styled.ItemLeft><Styled.ItemRight><RatingStars value={movie.rating || 0} onChange={(next) => setRatingQuick(movie.id, next)} titlePrefix={`Rate ${movie.title}`} />{movie.status !== "Watching" && <Styled.IconButton onClick={() => setStatusQuick(movie.id, "Watching")} title="Mark as watching" aria-label="Mark as watching"><FiPlay /></Styled.IconButton>}{movie.status !== "Watched" && <Styled.IconButton onClick={() => setStatusQuick(movie.id, "Watched")} title="Mark as watched" aria-label="Mark as watched"><FiCheck /></Styled.IconButton>}<Styled.IconButton onClick={() => setEditing(movie.id)} title="Edit movie" aria-label="Edit movie"><FiEdit2 /></Styled.IconButton><Styled.IconButton onClick={() => removeMovie(movie.id)} title="Delete movie" aria-label="Delete movie"><FiTrash2 /></Styled.IconButton></Styled.ItemRight></Styled.Item>)} </Styled.List>
            <Styled.FooterNote role={storageMessage ? "status" : undefined}>{storageMessage || "Data stays in your browser using LocalStorage."}</Styled.FooterNote>
            {confirm && createPortal(<Styled.ModalOverlay onClick={() => setConfirm(null)}><Styled.ModalCard ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="confirm-title" aria-describedby={confirm.message ? "confirm-message" : undefined} tabIndex={-1} onClick={(event) => event.stopPropagation()}><Styled.ModalTitle id="confirm-title">{confirm.title}</Styled.ModalTitle>{confirm.message ? <Styled.ModalMessage id="confirm-message">{confirm.message}</Styled.ModalMessage> : null}<Styled.ModalActions>{!confirm.hideCancel && <Styled.Button ref={cancelButtonRef} type="button" onClick={() => setConfirm(null)}>{confirm.cancelText || "Cancel"}</Styled.Button>}{confirm.tone === "danger" ? <Styled.DangerButton ref={confirmButtonRef} type="button" onClick={handleConfirm}>{confirm.confirmText || "Confirm"}</Styled.DangerButton> : <Styled.PrimaryButton ref={confirmButtonRef} type="button" onClick={handleConfirm}>{confirm.confirmText || "Confirm"}</Styled.PrimaryButton>}</Styled.ModalActions></Styled.ModalCard></Styled.ModalOverlay>, document.body)}
        </Styled.Container>
    </Styled.Page>;
}

function EditRow({ movie, onCancel, onSave }) {
    const [title, setTitle] = useState(movie.title);
    const [year, setYear] = useState(movie.year || "");
    const [status, setStatus] = useState(movie.status);
    const [rating, setRating] = useState(movie.rating || 0);
    const [posterUrl, setPosterUrl] = useState(movie.posterUrl || "");
    const [notes, setNotes] = useState(movie.notes || "");
    return <Styled.Item as="form" onSubmit={(event) => { event.preventDefault(); if (!title.trim()) return; onSave(movie.id, { title: title.trim(), year: year.trim(), status, rating: clamp(Number(rating) || 0, 0, 5), posterUrl: posterUrl.trim(), notes }); }}><Styled.ItemLeft className="editFields"><Styled.FormRow><Styled.Input aria-label="Movie title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title *" required /><Styled.Input aria-label="Year" value={year} onChange={(event) => setYear(event.target.value)} placeholder="Year" inputMode="numeric" pattern="\\d{4}" /><Styled.Select aria-label="Status" value={status} onChange={(event) => setStatus(event.target.value)}>{STATUSES.map((value) => <option key={value} value={value}>{value}</option>)}</Styled.Select><Styled.Select value={rating} onChange={(event) => setRating(Number(event.target.value))} aria-label="Rating">{RATINGS.map((value) => <option key={value} value={value}>{value === 0 ? "No rating" : `${value} stars`}</option>)}</Styled.Select><Styled.Input type="url" aria-label="Poster URL" value={posterUrl} onChange={(event) => setPosterUrl(event.target.value)} placeholder="Poster URL" /></Styled.FormRow><Styled.TextArea aria-label="Movie notes" placeholder="Notes (optional)" value={notes} onChange={(event) => setNotes(event.target.value)} /></Styled.ItemLeft><Styled.ItemRight><Styled.PrimaryButton type="submit">Save</Styled.PrimaryButton><Styled.Button type="button" onClick={onCancel}>Cancel</Styled.Button></Styled.ItemRight></Styled.Item>;
}
